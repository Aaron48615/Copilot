import { parentPort, workerData } from 'node:worker_threads'
import { pipeline, env } from '@huggingface/transformers'
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
env.cacheDir = join(workerData.cacheDir, 'models')
const cancelled = new Set()
let queue = Promise.resolve()
try {
  const extractor = await pipeline('feature-extraction', 'Xenova/bge-small-zh-v1.5', {
    dtype: 'q8', device: 'cpu', session_options: { intraOpNumThreads: 2, interOpNumThreads: 1 },
  })
  const embed = async (texts) => (await extractor(texts, { pooling: 'cls', normalize: true, truncation: true, max_length: 160 })).tolist()
  await mkdir(workerData.cacheDir, { recursive: true })
  const users = new Map()
  for (const bank of workerData.banks) {
    const hash = createHash('sha256').update('bge-small-zh-q8-cls-160-v1').update(JSON.stringify(bank.docs)).digest('hex')
    const path = join(workerData.cacheDir, `${bank.id}-${hash}.json`)
    let vectors
    try { vectors = JSON.parse(await readFile(path, 'utf8')) } catch { /* Build a missing or unreadable cache. */ }
    if (!Array.isArray(vectors) || vectors.length !== bank.docs.length || vectors.some((v) => !Array.isArray(v) || v.length !== 512 || v.some((n) => !Number.isFinite(n)))) {
      vectors = []
      for (let i = 0; i < bank.docs.length; i += 8) {
        vectors.push(...await embed(bank.docs.slice(i, i + 8).map((d) => d.text)))
        parentPort.postMessage({ kind: 'progress', userId: bank.id, done: vectors.length, total: bank.docs.length })
      }
      await writeFile(path + '.tmp', JSON.stringify(vectors), { mode: 0o600 })
      await rename(path + '.tmp', path)
    }
    users.set(bank.id, { docs: bank.docs, vectors })
  }
  const queries = new Map()
  parentPort.on('message', (message) => {
    if (message.kind === 'cancel') { cancelled.add(message.id); return }
    queue = queue.then(async () => {
      if (cancelled.delete(message.id)) return
      try {
        let vector = queries.get(message.query)
        if (!vector) {
          ;[vector] = await embed([message.query])
          queries.set(message.query, vector)
          if (queries.size > 128) queries.delete(queries.keys().next().value)
        }
        const bank = users.get(message.userId)
        const matches = bank ? bank.vectors.map((v, i) => ({ index: i, score: v.reduce((sum, n, j) => sum + n * vector[j], 0) })).sort((a,b) => b.score - a.score).slice(0, 30) : []
        if (!cancelled.delete(message.id)) parentPort.postMessage({ kind: 'result', id: message.id, matches })
      } catch { parentPort.postMessage({ kind: 'result', id: message.id, error: '本地语义检索失败' }) }
    })
  })
  parentPort.postMessage({ kind: 'ready' })
} catch (error) {
  parentPort.postMessage({ kind: 'error', error: `本地语义模型加载失败：${error.message}` })
}
