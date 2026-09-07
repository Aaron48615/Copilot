import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildRepositoryBanks, getCategories, searchQuestions } from '../src/question-bank.ts'
import { getAnswerContent } from '../src/answers.ts'
import { importLocalBank } from '../scripts/import-local-bank.mjs'

const root = new URL('../content/', import.meta.url)
const users = JSON.parse(readFileSync(new URL('users.json', root), 'utf8'))
const documents = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.md'))
  .map((name) => ({ name: name.replaceAll('\\', '/'), raw: readFileSync(new URL(name.replaceAll('\\', '/'), root), 'utf8') }))
const banks = buildRepositoryBanks(users, documents)
const doc = (name, body, projects = '[]') => ({ name, raw: `---\nid: probe\ntitle: 隔离测试\nprojects: ${projects}\n---\n\n## 核心回答\n\n${body}\n` })

test('protected original profile, project knowledge and Aaron projects remain byte-identical', () => {
  // Baseline: original main content and PR 9321de0 Aaron projects. Do not refresh to accept unintended edits.
  const protectedFiles = JSON.parse(readFileSync(new URL('./fixtures/protected-content.json', import.meta.url), 'utf8'))
  for (const [name, hash] of Object.entries(protectedFiles)) {
    assert.equal(createHash('sha256').update(readFileSync(new URL(name, root))).digest('hex'), hash, name)
  }
})

test('real banks keep project categories, metadata, search results and identity separate', () => {
  for (const user of banks) {
    const owner = users.find((item) => item.id === user.id)
    for (const question of user.questions) {
      assert.ok(question.sourcePath.startsWith(`${user.id}/`))
      assert.ok(question.projects.every((name) => owner.projects.includes(name)))
    }
    for (const other of banks.filter((item) => item.id !== user.id)) {
      const foreignCategories = new Set(other.questions.filter((q) => q.sourcePath.includes('/05-projects/')).map((q) => q.category))
      assert.ok(getCategories(user.questions).every((category) => !foreignCategories.has(category.id)))
      for (const project of users.find((item) => item.id === other.id).projects) {
        // Fuzzy search may return generic related knowledge, but never another user's question.
        assert.ok(searchQuestions(user.questions, project).every(({ question }) => question.sourcePath.startsWith(`${user.id}/`)))
      }
    }
  }
  const intro = banks.find((user) => user.id === 'aaron').questions.find((q) => q.id === 'profile-self-introduction')
  assert.match(getAnswerContent(intro).core, /我叫 Aaron/)
})

test('foreign projects, identity and evidence are rejected in either direction', () => {
  for (const owner of users) {
    const other = users.find((item) => item.id !== owner.id)
    for (const marker of [...other.projects, ...other.identityMarkers]) {
      assert.throws(() => buildRepositoryBanks(users, [doc(`${owner.id}/copy.md`, `示例 ${marker}`)]), /混入/)
    }
    assert.throws(() => buildRepositoryBanks(users, [doc(`${owner.id}/copy.md`, '正常正文', '[未登记项目]')]), /不属于/)
    assert.doesNotThrow(() => buildRepositoryBanks(users, [doc(`${owner.id}/valid.md`, '正常正文', `[${owner.projects[0]}]`)]))
  }
})

test('neutral technical topics can occur in both banks without merging their IDs', () => {
  const result = buildRepositoryBanks(users, [doc('default/probe.md', 'Promise 的通用解释'), doc('aaron/probe.md', 'Promise 的通用解释')])
  assert.equal(result[0].questions[0].id, result[1].questions[0].id)
  assert.notEqual(result[0].questions[0], result[1].questions[0])
  for (const question of banks.find((user) => user.id === 'aaron').questions.filter((q) => /^aaron\/0[1-4]/.test(q.sourcePath))) {
    assert.deepEqual(question.projects, [], question.sourcePath)
    assert.ok(getAnswerContent(question).core.trim(), question.sourcePath)
    assert.ok(Object.values(question.sections).every((answer) => answer.trim()), question.sourcePath)
  }
})

test('ownership registry rejects malformed rules', () => {
  for (const field of ['projects', 'identityMarkers']) {
    for (const value of ['', [''], [null]]) {
      assert.throws(() => buildRepositoryBanks([{ ...users[0], [field]: value }], []))
    }
  }
})

test('mixed migration batch rejects foreign material before writing any files', () => {
  const directory = mkdtempSync(join(tmpdir(), 'copilot-ownership-'))
  try {
    writeFileSync(join(directory, 'users.json'), JSON.stringify(users))
    const first = doc('safe.md', '普通原理')
    const second = doc('foreign.md', '牛颢然的个人经历')
    second.raw = second.raw.replace('id: probe', 'id: foreign')
    const backup = { users: [{ id: 'local', documents: [first, second] }] }
    assert.throws(() => importLocalBank(directory, backup, 'local', 'aaron'), /混入/)
    assert.deepEqual(readdirSync(directory), ['users.json'])
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
