import { readdirSync, readFileSync } from 'node:fs'
import { buildRepositoryBanks } from '../src/question-bank.ts'

const root = new URL('../content/', import.meta.url)
const users = JSON.parse(readFileSync(new URL('users.json', root), 'utf8'))
const documents = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.md'))
  .map((name) => ({ name: name.replaceAll('\\', '/'), raw: readFileSync(new URL(name.replaceAll('\\', '/'), root), 'utf8') }))
const banks = buildRepositoryBanks(users, documents)
console.log(`题库归属检查通过：${banks.map((user) => `${user.name} ${user.questions.length} 题`).join('；')}`)
