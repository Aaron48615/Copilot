import test from 'node:test'
import assert from 'node:assert/strict'
import { encodeWav, SpeechSegmenter } from '../src/voice-audio.ts'
import { cleanSpeech, searchVoice, voiceCandidates, reliableVoiceMatch } from '../src/voice-search.ts'
import { buildQuestionBank } from '../src/question-bank.ts'
import { readAnswer } from '../src/answer-stream.ts'

const doc = (id, title, body = '## 核心回答\n现有答案') => ({ name: `${id}.md`, raw: `---\nid: ${id}\ntitle: ${title}\n---\n${body}` })

test('WAV encoding clips PCM values, writes valid duration and downsamples 48 kHz to 16 kHz', () => {
  const wav = encodeWav([new Float32Array([-2, 0, 2])], 16000)
  const view = new DataView(wav)
  assert.equal(new TextDecoder().decode(wav.slice(0, 4)), 'RIFF')
  assert.equal(view.getUint32(24, true), 16000)
  assert.equal(view.getUint32(40, true), 6)
  assert.equal(view.getInt16(44, true), -32768)
  assert.equal(view.getInt16(48, true), 32767)
  const downsampled = new DataView(encodeWav([new Float32Array(48000).fill(0.5)], 48000))
  assert.equal(downsampled.getUint32(40, true), 32000)
  assert.equal(downsampled.getInt16(44, true), 16384)
})

test('silence and clicks do not submit; speech previews and silence commits exactly once', () => {
  const vad = new SpeechSegmenter(16000)
  const frame = (level) => new Float32Array(1600).fill(level)
  for (let i = 0; i < 30; i++) assert.deepEqual(vad.push(frame(0)), {})
  vad.push(frame(0.2))
  let events = Array.from({ length: 6 }, () => vad.push(frame(0)))
  assert.ok(events.every((event) => !event.audio && !event.started))
  events = Array.from({ length: 26 }, () => vad.push(frame(0.1)))
  assert.equal(events.filter((event) => event.started).length, 1)
  assert.equal(events.filter((event) => event.audio && !event.final).length, 1)
  events = Array.from({ length: 8 }, () => vad.push(frame(0)))
  assert.equal(events.filter((event) => event.final && event.audio).length, 1)
  assert.equal(vad.flush(), undefined)
})

test('continuous speech has a bounded final clip; manual submit clears the segment', () => {
  const vad = new SpeechSegmenter(16000)
  const chunk = new Float32Array(1600).fill(0.1)
  const events = Array.from({ length: 300 }, () => vad.push(chunk))
  assert.ok(events.at(-1).limited && events.at(-1).final && events.at(-1).audio)
  assert.equal(vad.flush(), undefined)
  for (let i = 0; i < 4; i++) vad.push(chunk)
  assert.ok(vad.flush())
  assert.equal(vad.flush(), undefined)
})

test('voice lookup removes oral fillers, opens embedded followups, and rejects ambiguous broad queries', () => {
  const questions = buildQuestionBank([], [
    doc('closure', '什么是闭包？', '## 核心回答\n闭包的答案\n## 追问：为什么闭包可能导致内存泄漏？\n释放引用'),
    doc('cache-a', '如何设计浏览器缓存？'), doc('cache-b', '如何设计接口缓存？'),
  ])
  const index = voiceCandidates(questions)
  assert.equal(cleanSpeech('嗯，请问你能不能讲一下什么是闭包？'), '什么是闭包')
  assert.equal(reliableVoiceMatch(searchVoice(index, '请问什么是闭包？'), '请问什么是闭包？')?.question.id, 'closure')
  const followup = reliableVoiceMatch(searchVoice(index, '为什么闭包可能导致内存泄漏？'), '为什么闭包可能导致内存泄漏？')
  assert.equal(followup?.question.id, 'closure')
  assert.equal(followup?.followupIndex, 0)
  assert.equal(reliableVoiceMatch(searchVoice(index, '缓存'), '缓存'), undefined)
  assert.equal(reliableVoiceMatch(searchVoice(index, '完全没有对应内容的量子问题'), '完全没有对应内容的量子问题'), undefined)
})

function streamResponse(text, split = 1) {
  const bytes = new TextEncoder().encode(text)
  return new Response(new ReadableStream({ start(controller) {
    for (let i = 0; i < bytes.length; i += split) controller.enqueue(bytes.slice(i, i + split))
    controller.close()
  } }), { headers: { 'Content-Type': 'text/event-stream' } })
}

test('answer stream handles fragmented Chinese bytes, CRLF, comments, usage, and DONE', async () => {
  const seen = []
  await readAnswer(streamResponse(': ping\r\n\r\ndata: {"choices":[{"delta":{"content":"你好"}}]}\r\n\r\ndata: {"choices":[{"delta":{"content":"世界"}}]}\n\ndata: {"choices":[],"usage":{}}\n\ndata: [DONE]\n\n'), (text) => seen.push(text))
  assert.deepEqual(seen, ['你好', '你好世界'])
})

test('answer stream reports mid-stream failures, truncated streams, empty replies, and supports legacy JSON', async () => {
  await assert.rejects(readAnswer(streamResponse('data: {"error":{"message":"余额不足"}}\n\n'), () => {}), /余额不足/)
  await assert.rejects(readAnswer(streamResponse('data: {"choices":[{"delta":{"content":"部分"}}]}\n\n'), () => {}), /连接中断/)
  await assert.rejects(readAnswer(streamResponse('data: [DONE]\n\n'), () => {}), /没有返回有效/)
  let answer
  await readAnswer(Response.json({ answer: '旧接口答案' }), (text) => { answer = text })
  assert.equal(answer, '旧接口答案')
})

test('matching the main clause handles duplicate question variants; ambiguous followups use current context', () => {
  const questions = buildQuestionBank([], [
    doc('closure-a', '什么是闭包？项目中使用过吗？'),
    doc('closure-b', '什么是闭包？项目中哪里用到了？'),
    doc('project-a', '项目甲', '## 核心回答\n甲\n## 追问：请求失败了怎么办？\n甲的处理'),
    doc('project-b', '项目乙', '## 核心回答\n乙\n## 追问：请求失败了怎么办？\n乙的处理'),
  ])
  const index = voiceCandidates(questions)
  assert.ok(reliableVoiceMatch(searchVoice(index, '什么是闭包？'), '什么是闭包？'))
  const matches = searchVoice(index, '请求失败了怎么办？')
  assert.equal(reliableVoiceMatch(matches, '请求失败了怎么办？'), undefined)
  assert.equal(reliableVoiceMatch(matches, '请求失败了怎么办？', 'project-b')?.question.id, 'project-b')
})
