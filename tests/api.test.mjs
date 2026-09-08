import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { createApiServer } from '../server/api.mjs'
import { buildRepositoryBanks } from '../src/question-bank.ts'
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
  assert.equal(badWav.status, 404)
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

test('resolve reports missing model configuration even for an exact title', async (t) => {
  const url = await serve(t, { apiKey: '', fetchImpl: () => { throw new Error('must not call provider') } })
  const response = await fetch(`${url}/api/resolve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'one', question: '缓存策略' }) })
  assert.equal(response.status, 503)
  assert.match((await response.json()).error, /OPENROUTER_API_KEY/)
})

test('semantic selection validates IDs and returns stored content', async (t) => {
  const url = await serve(t, { fetchImpl: async (_url, options) => {
    const payload = JSON.parse(options.body)
    assert.equal(payload.stream, false)
    const input = JSON.parse(payload.messages[1].content)
    assert.ok(!options.body.includes('乙的独立方案'))
    return Response.json({ choices: [{ message: { content: JSON.stringify({ matchCandidateId: input.candidates[0].candidateId, isFollowup: false, projectIds: [], searchQueries: [] }) } }] })
  } })
  const response = await fetch(`${url}/api/resolve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'one', question: '请求结果要怎么缓存起来', contextQuestionId: 'b' }) })
  const data = await response.json()
  assert.equal(data.kind, 'library')
  assert.equal(data.match.answer, '甲的缓存方案')
})

test('semantic miss uses rewritten source queries, emits evidence and discards unrelated old context', async (t) => {
  let calls = 0
  const source = { id: 'S1', project: '项目甲', projectId: 'p', path: 'src/cart.ts', start: 1, end: 2, revision: 'r', text: 'const quantity = 1' }
  const url = await serve(t, {
    projectIndex: { refresh: async () => {}, status: (user) => user === 'one' ? [{ id: 'p', name: '项目甲', files: 1 }] : [], search: (user, queries, ids) => {
      assert.equal(user, 'one'); assert.ok(queries.includes('cart quantity')); assert.deepEqual(ids, ['p']); return [source]
    } },
    fetchImpl: async (_url, options) => {
      calls++
      const payload = JSON.parse(options.body)
      if (!payload.stream) return Response.json({ choices: [{ message: { content: JSON.stringify({ matchCandidateId: null, isFollowup: false, projectIds: ['p', 'forged'], searchQueries: ['cart quantity'] }) } }] })
      const input = JSON.parse(payload.messages[1].content)
      assert.equal(input.currentQuestion, undefined)
      assert.deepEqual(input.sources, [source])
      return new Response('data: {"choices":[{"delta":{"content":"源码回答 [S1]"}}]}\n\ndata: [DONE]\n\n', { headers: { 'Content-Type': 'text/event-stream' } })
    },
  })
  const response = await fetch(`${url}/api/resolve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'one', question: '购物车加号乱序怎么处理', contextQuestionId: 'a' }) })
  let metadata, answer
  await readAnswer(response, (value) => { answer = value }, (value) => { metadata = value })
  assert.equal(answer, '源码回答 [S1]'); assert.deepEqual(metadata.sources, [source]); assert.equal(calls, 2)
  assert.deepEqual(await (await fetch(`${url}/api/projects?userId=two`)).json(), { projects: [] })
})

test('unknown semantic candidate and malformed semantic JSON fail without generating', async (t) => {
  for (const content of ['broken JSON', JSON.stringify({ matchCandidateId: 'foreign', isFollowup: false, projectIds: [], searchQueries: [] })]) {
    let calls = 0
    const url = await serve(t, { fetchImpl: async () => { calls++; return Response.json({ choices: [{ message: { content } }] }) } })
    const response = await fetch(`${url}/api/resolve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'one', question: '一个全新问题' }) })
    assert.equal(response.status, 502); assert.equal(calls, 1)
  }
})

test('complete input is matched by the model even when a title is an exact lexical match', async (t) => {
  let modelCalls = 0
  const url = await serve(t, { fetchImpl: async (_url, options) => {
    modelCalls++
    const payload = JSON.parse(options.body)
    const input = JSON.parse(payload.messages[1].content)
    assert.equal(input.question, '缓存策略')
    return Response.json({ choices: [{ message: { content: JSON.stringify({ matchCandidateId: input.candidates[0].candidateId, isFollowup: false, projectIds: [], searchQueries: [] }) } }] })
  } })
  const response = await fetch(`${url}/api/resolve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'one', question: '缓存策略' }) })
  assert.equal((await response.json()).match.questionId, 'a')
  assert.equal(modelCalls, 1)
})

test('production hybrid path returns stored answers with no cloud calls or key', async (t) => {
  let calls=0
  const url=await serve(t,{apiKey:'',semanticIndex:{status:()=>({status:'ready'}),search:async()=>[]},fetchImpl:async()=>{calls++;throw Error('cloud must not be used')}})
  const response=await fetch(`${url}/api/resolve`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'one',question:'缓存策略'})})
  assert.equal((await response.json()).kind,'library');assert.equal(calls,0)
})

test('DeepSeek only receives a generation request after hybrid retrieval misses', async(t)=>{
  const {providerConfig}=await import('../server/provider.mjs')
  let calls=0
  const url=await serve(t,{...providerConfig({DEEPSEEK_API_KEY:'test-deepseek'}),semanticIndex:{status:()=>({status:'ready'}),search:async()=>[]},fetchImpl:async(endpoint,options)=>{
    calls++;assert.equal(endpoint,'https://api.deepseek.com/chat/completions')
    const payload=JSON.parse(options.body)
    assert.equal(payload.model,'deepseek-v4-flash');assert.deepEqual(payload.thinking,{type:'disabled'});assert.equal(payload.stream,true)
    assert.equal(options.headers.Authorization,'Bearer test-deepseek')
    return new Response('data: {"choices":[{"delta":{"content":"补充答案"}}]}\n\ndata: [DONE]\n\n',{headers:{'Content-Type':'text/event-stream'}})
  }})
  const response=await fetch(`${url}/api/resolve`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'one',question:'完全不相关的量子问题怎么解释'})})
  let answer;await readAnswer(response,(value)=>{answer=value});assert.equal(answer,'补充答案');assert.equal(calls,1)
})
