import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createApiServer, loadBanks } from './api.mjs'
import { loadProjectIndex } from './project-index.mjs'
import { SemanticIndex } from './semantic-index.mjs'
import { providerConfig } from './provider.mjs'
import { retrieve } from './resolve.mjs'
const root = fileURLToPath(new URL('../', import.meta.url))
// Existing process environment takes precedence; .env.local takes precedence over .env.
for (const name of ['.env.local', '.env']) {
  try { loadEnvFile(resolve(root, name)) } catch (error) { if (error.code !== 'ENOENT') throw error }
}
const port = Number(process.env.API_PORT || 3001)
const host = process.env.API_HOST || '127.0.0.1'
const banks = await loadBanks(root)
const semanticIndex = new SemanticIndex(banks, root)
// Prepare lexical indices at startup so the first submitted question does not pay this cost.
for (const bank of banks) retrieve(bank, 'warmup')
const server = createApiServer({
  banks, semanticIndex, ...providerConfig(),
  projectIndex: await loadProjectIndex(root),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean), dist: resolve(root, 'dist'),
})
server.listen(port, host, () => console.log(`检索与回答服务：http://${host}:${port}`))
server.on('error', (error) => { console.error(`API 服务启动失败：${error.message}`); process.exit(1) })
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => {
  await semanticIndex.close()
  server.closeAllConnections(); server.close(() => process.exit(0))
})
