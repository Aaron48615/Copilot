import test from 'node:test'
import assert from 'node:assert/strict'
import { cleanQuery, searchCandidates, answerCandidates, reliableAnswerMatch } from '../src/query-search.ts'
import { buildQuestionBank } from '../src/question-bank.ts'
import { readAnswer } from '../src/answer-stream.ts'

const doc = (id, title, body = '## 核心回答\n现有答案') => ({ name: `${id}.md`, raw: `---\nid: ${id}\ntitle: ${title}\n---\n${body}` })

test('text lookup removes oral fillers, opens embedded followups, and rejects ambiguous broad queries', () => {
  const questions = buildQuestionBank([], [
    doc('closure', '什么是闭包？', '## 核心回答\n闭包的答案\n## 追问：为什么闭包可能导致内存泄漏？\n释放引用'),
    doc('cache-a', '如何设计浏览器缓存？'), doc('cache-b', '如何设计接口缓存？'),
  ])
  const index = answerCandidates(questions)
  assert.equal(cleanQuery('嗯，请问你能不能讲一下什么是闭包？'), '什么是闭包')
  assert.equal(reliableAnswerMatch(searchCandidates(index, '请问什么是闭包？'), '请问什么是闭包？')?.question.id, 'closure')
  const followup = reliableAnswerMatch(searchCandidates(index, '为什么闭包可能导致内存泄漏？'), '为什么闭包可能导致内存泄漏？')
  assert.equal(followup?.question.id, 'closure')
  assert.equal(followup?.followupIndex, 0)
  assert.equal(reliableAnswerMatch(searchCandidates(index, '缓存'), '缓存'), undefined)
  assert.equal(reliableAnswerMatch(searchCandidates(index, '完全没有对应内容的量子问题'), '完全没有对应内容的量子问题'), undefined)
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

test('partial clauses require semantic verification; ambiguous followups use current context', () => {
  const questions = buildQuestionBank([], [
    doc('closure-a', '什么是闭包？项目中使用过吗？'),
    doc('closure-b', '什么是闭包？项目中哪里用到了？'),
    doc('project-a', '项目甲', '## 核心回答\n甲\n## 追问：请求失败了怎么办？\n甲的处理'),
    doc('project-b', '项目乙', '## 核心回答\n乙\n## 追问：请求失败了怎么办？\n乙的处理'),
  ])
  const index = answerCandidates(questions)
  assert.equal(reliableAnswerMatch(searchCandidates(index, '什么是闭包？'), '什么是闭包？'), undefined)
  const matches = searchCandidates(index, '请求失败了怎么办？')
  assert.equal(reliableAnswerMatch(matches, '请求失败了怎么办？'), undefined)
  assert.equal(reliableAnswerMatch(matches, '请求失败了怎么办？', 'project-b')?.question.id, 'project-b')
})
