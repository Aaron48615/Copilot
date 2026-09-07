import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createApiServer, loadBanks } from './api.mjs'
const root = fileURLToPath(new URL('../', import.meta.url))
// Existing process environment takes precedence; .env.local takes precedence over .env.
for (const name of ['.env.local', '.env']) {
  try { loadEnvFile(resolve(root, name)) } catch (error) { if (error.code !== 'ENOENT') throw error }
}
const port = Number(process.env.API_PORT || 3001)
const host = process.env.API_HOST || '127.0.0.1'
const server = createApiServer({
  banks: await loadBanks(root), apiKey: process.env.OPENROUTER_API_KEY,
  asrModel: process.env.OPENROUTER_ASR_MODEL, answerModel: process.env.OPENROUTER_ANSWER_MODEL,
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean), dist: resolve(root, 'dist'),
})
server.listen(port, host, () => console.log(`语音与回答服务：http://${host}:${port}`))
server.on('error', (error) => { console.error(`API 服务启动失败：${error.message}`); process.exit(1) })
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  server.closeAllConnections(); server.close(() => process.exit(0))
})
