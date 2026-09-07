import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { createApiServer } from '../server/api.mjs'
import { buildRepositoryBanks } from '../src/question-bank.ts'
import { encodeWav } from '../src/voice-audio.ts'
import { readAnswer } from '../src/answer-stream.ts'

const banks = buildRepositoryBanks([{ id: 'one', name: '甲' }, { id: 'two', name: '乙' }], [
  { name: 'one/a.md', raw: '---\nid: a\ntitle: 缓存策略\n---\n## 核心回答\n甲的缓存方案' },
  { name: 'two/b.md', raw: '---\nid: b\ntitle: 缓存策略\n---\n## 核心回答\n乙的独立方案' },
])
async function serve(t, options = {}) {
  const server = createApiServer({ banks, apiKey: 'test-key', ...options })
  server.listen(0, '127.0.0.1'); await once(server, 'listening')
  t.after(() => { server.closeAllConnections(); return new Promise((resolve) => server.close(resolve)) })
  return `http://127.0.0.1:${server.address().port}`
}
const post = (url, data) => fetch(`${url}/api/answer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

test('transcription forwards actual WAV as base64 with the requested ASR model, keeping key server-side', async (t) => {
  const wav = encodeWav([new Float32Array(16000).fill(0.1)], 16000)
  const url = await serve(t, { fetchImpl: async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/audio/transcriptions')
    assert.equal(options.headers.Authorization, 'Bearer test-key')
    const input = JSON.parse(options.body)
    assert.equal(input.model, 'qwen/qwen3-asr-flash-2026-02-10')
    assert.equal(input.input_audio.format, 'wav')
    assert.deepEqual(Buffer.from(input.input_audio.data, 'base64'), Buffer.from(wav))
    return Response.json({ text: '什么是闭包？', usage: { cost: 1 } })
  } })
  const response = await fetch(`${url}/api/transcribe`, { method: 'POST', headers: { 'Content-Type': 'audio/wav' }, body: wav })
  assert.deepEqual(await response.json(), { text: '什么是闭包？' })
  assert.deepEqual(await (await fetch(`${url}/api/health`)).json(), { configured: true })
})

test('fallback streams content and only uses the selected user’s server-owned references', async (t) => {
  const url = await serve(t, { fetchImpl: async (_url, options) => {
    const payload = JSON.parse(options.body)
    assert.equal(payload.stream, true)
    assert.equal(payload.model, 'qwen/qwen3-30b-a3b-instruct-2507')
    assert.ok(options.body.includes('甲的缓存方案'))
    assert.ok(!options.body.includes('乙的独立方案'))
    assert.ok(!options.body.includes('伪造参考'))
    const input = JSON.parse(payload.messages[1].content)
    assert.equal(input.userName, '甲')
    assert.equal(input.currentQuestion, undefined)
    return new Response('data: {"choices":[{"delta":{"content":"回答内容"}}]}\n\ndata: [DONE]\n\n', { headers: { 'Content-Type': 'text/event-stream' } })
  } })
  const response = await post(url, { question: '缓存策略', userId: 'one', userName: '伪造参考', contextQuestionId: 'b' })
  let answer
  await readAnswer(response, (text) => { answer = text })
  assert.equal(answer, '回答内容')
})

test('missing key, unknown users, invalid input, cross-origin and upstream errors are actionable', async (t) => {
  const noKey = await serve(t, { apiKey: '' })
  assert.equal((await post(noKey, { question: '问题', userId: 'one' })).status, 503)
  const url = await serve(t, { fetchImpl: async () => Response.json({ error: 'do not leak provider details test-key' }, { status: 401 }) })
  assert.equal((await post(url, { question: '问题', userId: 'missing' })).status, 400)
  assert.equal((await post(url, null)).status, 400)
  assert.equal((await post(url, { question: '', userId: 'one' })).status, 400)
  const denied = await fetch(`${url}/api/transcribe`, { method: 'POST', headers: { Origin: 'https://other.example', 'Content-Type': 'audio/wav' }, body: 'bad' })
  assert.equal(denied.status, 403)
  const badWav = await fetch(`${url}/api/transcribe`, { method: 'POST', headers: { 'Content-Type': 'audio/wav' }, body: 'bad' })
  assert.equal(badWav.status, 400)
  const failed = await post(url, { question: '问题', userId: 'one' })
  assert.equal(failed.status, 401)
  const text = await failed.text()
  assert.match(text, /Key 无效/); assert.ok(!text.includes('test-key'))
})

test('disconnecting a browser aborts the upstream generation request', async (t) => {
  let signal
  let ready
  const started = new Promise((resolve) => { ready = resolve })
  const url = await serve(t, { fetchImpl: async (_url, options) => {
    signal = options.signal; ready()
    await new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true }))
  } })
  const controller = new AbortController()
  const response = fetch(`${url}/api/answer`, { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: '问题', userId: 'one' }) }).catch(() => {})
  await started
  const aborted = once(signal, 'abort')
  controller.abort(); await aborted; await response
  assert.equal(signal.aborted, true)
})
