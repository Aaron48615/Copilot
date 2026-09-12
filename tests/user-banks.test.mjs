import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildQuestionBank, buildRepositoryBanks, getCategories, searchQuestions } from '../src/question-bank.ts'
import { getTextMatchRanges } from '../src/search-text.ts'
import { loadProfiles, PROFILE_STORAGE_KEY, LEGACY_STORAGE_KEY } from '../src/profiles.ts'
import { importLocalBank } from '../scripts/import-local-bank.mjs'

const document = (id, title = id, category = 'react') => ({ name: `${id}.md`, raw: `---\nid: ${id}\ntitle: ${title}\ncategory: ${category}\n---\n\n## 核心回答\n\n${title} 的答案。` })
const storage = (values = {}) => ({ getItem: (key) => values[key] ?? null })
const users = [{ id: 'default', name: '牛' }, { id: 'guest', name: '访客' }]
const ids = users.map((user) => user.id)
const docs = [
  { ...document('same', '原用户问题', 'javascript'), name: 'default/same.md' },
  { ...document('same', '独有测试题'), name: 'guest/react/same.md' },
]

test('repository publishes isolated default and Aaron banks', () => {
  const root = new URL('../content/', import.meta.url)
  const registry = JSON.parse(readFileSync(new URL('users.json', root), 'utf8'))
  const documents = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.md'))
    .map((name) => ({ name, raw: readFileSync(new URL(name, root), 'utf8') }))
  const banks = buildRepositoryBanks(registry, documents)
  const defaultQuestions = banks.find((user) => user.id === 'default').questions
  assert.ok(defaultQuestions.length >= 500)
  assert.ok(defaultQuestions.every((question) => question.category === 'current-interview'))
  assert.deepEqual(banks.map((user) => user.id), ['default', 'aaron'])
  const aaron = banks.find((user) => user.id === 'aaron')
  assert.equal(aaron.name, 'Aaron')
  assert.equal(aaron.questions.length, 401)
  assert.equal(aaron.questions.filter((question) => question.projects.length === 0).length, 204)
  assert.equal(aaron.questions.filter((question) => question.projects.length === 1).length, 197)
  assert.ok(aaron.questions.every((question) => question.category !== 'current-interview'))
})

test('two clean browser stores resolve identical users and banks without importing', () => {
  const first = loadProfiles(storage(), ids)
  const second = loadProfiles(storage(), ids)
  assert.deepEqual(first, second)
  const banks = buildRepositoryBanks(users, docs)
  assert.equal(banks[0].questions.length, 1)
  assert.equal(banks[1].questions.length, 1)
  assert.equal(searchQuestions(banks[1].questions, '独有测试题')[0].question.title, '独有测试题')
  assert.equal(banks[0].questions.some((q) => q.title === '独有测试题'), false)
  assert.deepEqual(getCategories(banks[1].questions).map((item) => item.id), ['all', 'react'])
  assert.deepEqual(buildRepositoryBanks(users, []).map((user) => user.questions), [[], []])
})

test('repository user search matches an answered follow-up heading', () => {
  const followup = {
    ...document('request-failure', '请求策略'),
    name: 'guest/react/request-failure.md',
  }
  followup.raw += '\n\n## 追问：请求失败怎么办？\n\n取消旧请求并展示可重试的错误状态。'
  const banks = buildRepositoryBanks(users, [followup])
  const results = searchQuestions(banks[1].questions, '请求失败怎么办')
  assert.equal(results[0].question.id, 'request-failure')
})

test('快查支持完整拼音并高亮对应中文字符', () => {
  const titleMatch = document('pinyin-title', '轻购的请求层')
  titleMatch.name = 'default/pinyin-title.md'
  const projectMatch = document('pinyin-project', '请求失败处理')
  projectMatch.name = 'default/pinyin-project.md'
  projectMatch.raw = projectMatch.raw.replace('category: react', 'category: react\nprojects: [轻购]')
  const questions = buildQuestionBank([], [titleMatch, projectMatch])

  const results = searchQuestions(questions, 'qinggou')
  assert.equal(results[0].question.id, 'pinyin-title')
  assert.ok(results.some(({ question }) => question.id === 'pinyin-project'))
  assert.deepEqual(getTextMatchRanges('轻购的请求层', 'qinggou'), [[0, 2]])
  assert.deepEqual(getTextMatchRanges('请求层', '请求 层'), [[0, 3]])
  assert.deepEqual(getTextMatchRanges('轻购的请求层', 'qing'), [[0, 1], [3, 4]])
  assert.deepEqual(getTextMatchRanges('轻购的请求层', 'inggou'), [])
})

test('快查列表展示全部结果，不按优先级截断或重排', () => {
  const documents = Array.from({ length: 25 }, (_, index) => {
    const item = document(`flat-${index}`, 'React 快查题', 'react')
    if (index === 24) item.raw = item.raw.replace('category: react', 'category: react\npriority: high')
    item.name = `default/flat-${index}.md`
    return item
  })
  const questions = buildQuestionBank([], documents)
  assert.deepEqual(questions.map((question) => question.id), documents.map((item) => item.raw.match(/^id: (.+)$/m)[1]))
  assert.equal(searchQuestions(questions, '').length, 25)
  assert.equal(searchQuestions(questions, 'React').length, 25)
})

test('registry rejects unknown folders, duplicate users and duplicate IDs within one bank', () => {
  assert.throws(() => buildRepositoryBanks(users, [{ ...docs[0], name: 'unknown/q.md' }]), /已配置/)
  assert.throws(() => buildRepositoryBanks(users, [{ ...docs[0], name: 'default/../guest/q.md' }]))
  assert.throws(() => buildRepositoryBanks([...users, users[0]], []), /唯一/)
  assert.throws(() => buildRepositoryBanks([{ id: '../escape', name: 'bad' }], []))
  assert.throws(() => buildRepositoryBanks(users, [docs[0], { ...docs[0], name: 'default/another.md' }]), /已存在/)
})

test('legacy preferences migrate without importing local users or overwriting repository data', () => {
  const legacy = JSON.stringify({ activeUserId: 'old-local-user', users: [
    { id: 'default', name: '旧名称', favorites: ['same'], documents: [document('local-only')] },
    { id: 'old-local-user', name: '本地用户', favorites: ['same'], documents: [] },
  ] })
  const values = { [LEGACY_STORAGE_KEY]: legacy }
  const restored = loadProfiles(storage(values), ids)
  assert.equal(restored.activeUserId, 'default')
  assert.deepEqual(restored.favorites.default, ['same'])
  assert.equal(restored.favorites.guest, undefined)
  assert.equal(values[LEGACY_STORAGE_KEY], legacy)
  assert.equal(buildRepositoryBanks(users, docs)[0].name, '牛')
  assert.deepEqual(loadProfiles(storage({ 'interview-favorites': '["old-question"]' }), ids).favorites.default, ['old-question'])
})

test('current user and separate favorites survive reload; unavailable storage does not block banks', () => {
  const preferences = { activeUserId: 'guest', favorites: { default: [], guest: ['same'] } }
  assert.deepEqual(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: JSON.stringify(preferences) }), ids), preferences)
  for (const bad of ['{broken', 'null', '{"favorites":[]}']) {
    assert.equal(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: bad }), ids).activeUserId, 'default')
  }
  assert.equal(loadProfiles({ getItem() { throw new Error('blocked') } }, ids).activeUserId, 'default')
  assert.equal(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: '{"activeUserId":"removed","favorites":{}}' }), ids).activeUserId, 'default')
  assert.deepEqual(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: JSON.stringify({ activeUserId: 'guest', favorites: { default: ['same'], guest: ['same'], stranger: ['secret'] } }) }), ids), {
    activeUserId: 'guest', favorites: { default: ['same'], guest: ['same'] },
  })
})

test('invalid Markdown is rejected and Windows line endings are supported', () => {
  assert.throws(() => buildQuestionBank([], [{ name: 'invalid.md', raw: '# missing metadata' }]), /需要/)
  const crlf = document('windows')
  crlf.raw = '\uFEFF' + crlf.raw.replaceAll('\n', '\r\n')
  assert.equal(buildQuestionBank([], [crlf])[0].id, 'windows')
})

test('migration writes original Markdown to the chosen bank and refuses repeat imports', () => {
  const directory = mkdtempSync(join(tmpdir(), 'copilot-migration-'))
  try {
    writeFileSync(join(directory, 'users.json'), JSON.stringify(users))
    const backup = { users: [{ id: 'legacy-id', documents: [document('first'), document('second')] }] }
    assert.equal(importLocalBank(directory, backup, 'legacy-id', 'guest'), 2)
    const files = readdirSync(join(directory, 'guest/imported'))
    assert.equal(files.length, 2)
    const contents = files.map((file) => readFileSync(join(directory, 'guest/imported', file), 'utf8')).sort()
    assert.deepEqual(contents, backup.users[0].documents.map((doc) => doc.raw).sort())
    assert.throws(() => importLocalBank(directory, backup, 'legacy-id', 'guest'), /已存在/)
    assert.throws(() => importLocalBank(directory, backup, 'legacy-id', '../outside'), /不存在/)
    assert.deepEqual(files, readdirSync(join(directory, 'guest/imported')))
  } finally { rmSync(directory, { recursive: true, force: true }) }
})
