import { Worker } from 'node:worker_threads'
import { resolve } from 'node:path'
import { answerCandidates } from '../src/query-search.ts'
import { getAnswerContent } from '../src/answers.ts'

export class SemanticIndex {
  constructor(banks, root) {
    this.banks = new Map(banks.map((user) => [user.id, answerCandidates(user.questions)]))
    this.state = { status: 'loading' }
    this.pending = new Map(); this.sequence = 0
    this.worker = new Worker(new URL('./semantic-worker.mjs', import.meta.url), { execArgv: [...process.execArgv.filter((arg) => !arg.startsWith('--input-type')), ...(process.allowedNodeEnvironmentFlags.has('--use-env-proxy') ? ['--use-env-proxy'] : [])], workerData: {
      cacheDir: resolve(root, '.cache/semantic'), banks: [...this.banks].map(([id, candidates]) => ({ id, docs: candidates.map(({ question, parent, followupIndex }) => ({
        text: [question.title, ...(followupIndex === undefined ? question.aliases.slice(0, 2) : [parent.title]), ...question.projects, getAnswerContent(question).core.slice(0, 120)].join(' '),
      })) })),
    } })
    this.worker.on('message', (message) => {
      if (message.kind === 'ready') this.state = { status: 'ready' }
      if (message.kind === 'progress') this.state = { status: 'loading', userId: message.userId, done: message.done, total: message.total }
      if (message.kind === 'error') this.fail(message.error)
      if (message.kind === 'result') {
        const callback = this.pending.get(message.id)
        if (callback) { this.pending.delete(message.id); callback(message) }
      }
    })
    this.worker.on('error', (error) => this.fail(`本地语义检索进程异常：${error.message}`))
    this.worker.on('exit', () => { if (!['closed', 'error'].includes(this.state.status)) this.fail('本地语义检索进程已退出') })
  }
  fail(error) {
    this.state = { status: 'error', error }
    for (const callback of this.pending.values()) callback({ error })
    this.pending.clear()
  }
  status() { return this.state }
  async search(userId, query, signal) {
    if (this.state.status !== 'ready') return []
    if (signal?.aborted) throw new Error('请求已取消')
    if (this.pending.size >= 6) throw new Error('本地检索繁忙，请稍后重试')
    const id = ++this.sequence
    const data = await new Promise((resolve, reject) => {
      const cancel = () => { this.pending.delete(id); this.worker.postMessage({ kind: 'cancel', id }); clearTimeout(timer); signal?.removeEventListener('abort', cancel); reject(new Error('检索已取消或超时')) }
      const timer = setTimeout(cancel, 10000)
      signal?.addEventListener('abort', cancel, { once: true })
      this.pending.set(id, (result) => { clearTimeout(timer); signal?.removeEventListener('abort', cancel); result.error ? reject(new Error(result.error)) : resolve(result) })
      this.worker.postMessage({ id, userId, query })
    })
    return data.matches.map(({ index, score }) => {
      const item = this.banks.get(userId)[index]
      return { question: item.parent, followupIndex: item.followupIndex, score }
    })
  }
  async close() { this.state = { status: 'closed' }; for (const callback of this.pending.values()) callback({ error: '服务关闭' }); this.pending.clear(); await this.worker.terminate() }
}
