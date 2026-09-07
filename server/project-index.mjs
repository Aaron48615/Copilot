import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, realpath, lstat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { createHash } from 'node:crypto'
import { createLexicalIndex, terms } from '../src/retrieval.ts'
const exec = promisify(execFile)
const extensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.md', '.json', '.css', '.scss', '.html', '.sql'])
const excluded = /(^|\/)(\.[^/]+|node_modules|dist|build|coverage|vendor|public|generated)(\/|$)|(?:lock\.(?:json|yaml)|yarn\.lock|\.min\.|\.d\.ts$)|(?:secret|credential|private[-_]?key|service[-_]?account)/i
export function redactSource(text) {
  return text
    .replace(/-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?-----END [^-]*PRIVATE KEY-----/g, (value) => value.replace(/[^\n]/g, '*'))
    .replace(/\b(?:sk-(?:or-v1-)?|ghp_|github_pat_)[a-zA-Z0-9_-]{15,}/g, '[REDACTED]')
    .replace(/((?:api[_-]?key|secret|password|access[_-]?token|auth[_-]?token|securityJsCode)["'`]?\s*[=:]\s*)(["'`])[^\n"'`]{6,}\2/gi, '$1"[REDACTED]"')
}
export class ProjectIndex {
  constructor(root, definitions) { this.root = root; this.definitions = definitions; this.projects = []; this.checked = 0; this.pending = null }
  async refresh(force = false) {
    if (this.pending) return this.pending
    if (!force && Date.now() - this.checked < 3000) return
    this.pending = this.build().finally(() => { this.checked = Date.now(); this.pending = null })
    return this.pending
  }
  async build() {
    const projects = []
    for (const definition of this.definitions) {
      try {
        const root = await realpath(resolve(this.root, definition.root))
        const top = await exec('git', ['rev-parse', '--show-toplevel'], { cwd: root })
        if (await realpath(top.stdout.trim()) !== root) throw new Error('项目根目录必须是 Git 仓库根目录')
        const { stdout } = await exec('git', ['ls-files', '-z'], { cwd: root, maxBuffer: 4 * 1024 * 1024 })
        const names = stdout.split('\0').filter((name) => name && extensions.has(extname(name)) && !excluded.test(name))
        const entries = []
        let totalBytes = 0, skipped = Math.max(0, names.length - 2000)
        for (const name of names.slice(0, 2000)) {
          const file = resolve(root, name)
          const info = await lstat(file).catch(() => null)
          if (!info?.isFile() || info.isSymbolicLink() || info.size > 512 * 1024 || totalBytes + info.size > 20 * 1024 * 1024) { skipped++; continue }
          totalBytes += info.size
          const actual = await realpath(file)
          if (!actual.startsWith(root + sep)) continue
          entries.push({ name, file, mtime: info.mtimeMs, size: info.size })
        }
        const revision = createHash('sha256').update(JSON.stringify(entries.map(({ name, mtime, size }) => [name, mtime, size]))).digest('hex').slice(0, 16)
        const previous = this.projects.find((item) => item.id === definition.id && item.revision === revision)
        if (previous) { projects.push(previous); continue }
        const chunks = []
        for (const entry of entries) {
          const text = redactSource(await readFile(entry.file, 'utf8'))
          if (text.includes('\0')) continue
          const lines = text.split('\n')
          for (let start = 0; start < lines.length;) {
            let end = Math.min(lines.length, start + 70)
            while (end > start + 1 && lines.slice(start, end).join('\n').length > 9000) end--
            if (lines.slice(start, end).join('\n').length > 9000) { skipped++; start++; continue }
            chunks.push({ projectId: definition.id, project: definition.name, path: entry.name, start: start + 1, end, text: lines.slice(start, end).join('\n') })
            start = end === lines.length ? end : Math.max(start + 1, end - 15)
          }
        }
        projects.push({ ...definition, revision, files: entries.length, skipped, chunks, updatedAt: new Date().toISOString(), search: createLexicalIndex(chunks, (chunk) => `${chunk.path} ${chunk.text}`) })
      } catch { projects.push({ ...definition, files: 0, chunks: [], error: '项目目录不可读取，或不是 Git 仓库。' }) }
    }
    this.projects = projects
  }
  status(userId) {
    return this.projects.filter((item) => item.userId === userId).map(({ id, name, aliases, description, files, skipped, revision, updatedAt, error }) => ({ id, name, aliases, description, files, skipped, revision, updatedAt, error }))
  }
  search(userId, queries, projectIds = []) {
    const projects = this.projects.filter((item) => item.userId === userId && (!projectIds.length || projectIds.includes(item.id)))
    const matches = new Map()
    for (const project of projects) for (const query of queries) {
      const scopedQuery = (project.aliases || [project.name]).reduce((text, alias) => text.replaceAll(alias, ' '), query)
      const queryTerms = new Set(terms(scopedQuery, true))
      for (const { item, score: lexicalScore } of project.search?.(scopedQuery, 40) || []) {
        const pathScore = terms(item.path).filter((word) => queryTerms.has(word)).length * 6
        const implementation = /^(src|server|functions)\//.test(item.path)
        const score = (lexicalScore + pathScore) * (implementation ? 1 : 0.3)
        const key = `${item.projectId}:${item.path}:${item.start}`
        if (score > (matches.get(key)?.score || 0)) matches.set(key, { ...item, revision: project.revision, score })
      }
    }
    const chosen = []
    for (const item of [...matches.values()].sort((a, b) => b.score - a.score)) {
      if (projects.length > 1 && chosen.filter((other) => other.projectId === item.projectId).length >= 3) continue
      if (chosen.some((other) => other.projectId === item.projectId && other.path === item.path && other.start <= item.end && item.start <= other.end)) continue
      chosen.push(item)
      if (chosen.length === 6) break
    }
    return chosen.map(({ score, ...item }, index) => ({ id: `S${index + 1}`, ...item }))
  }
}
export async function loadProjectIndex(root) {
  const definitions = JSON.parse(await readFile(resolve(root, process.env.PROJECTS_CONFIG || 'config/projects.json'), 'utf8'))
  const ids = new Set()
  for (const item of definitions) {
    if (!item.id || !item.name || !item.root || !item.userId || ids.has(item.id)) throw new Error('config/projects.json 项目配置无效或 ID 重复。')
    ids.add(item.id)
  }
  const index = new ProjectIndex(root, definitions)
  await index.refresh(true)
  return index
}
