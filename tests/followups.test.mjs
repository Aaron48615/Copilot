import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { buildQuestionBank, buildRepositoryBanks, parseMarkdown } from '../src/question-bank.ts'
import { getPendingFollowups, resolveFollowups } from '../src/answers.ts'

const doc = (id, title = id, ids, body = '## 核心回答\n答案') => ({
  name: `${id}.md`, raw: `---\nid: ${id}\ntitle: ${title}\n${ids === undefined ? '' : `followupIds: [${ids.join(', ')}]\n`}---\n${body}`,
})

test('followupIds defaults to empty, parses quoted IDs and preserves explicit then embedded order', () => {
  assert.deepEqual(parseMarkdown('old.md', doc('old').raw).followupIds, [])
  const bank = buildQuestionBank([], [
    doc('parent', '主问题', ['"second"', "'first'"], '## 核心回答\n核心\n## 追问：题内问题？\n题内回答\n## 代码证据\n主问题.ts:1'),
    doc('first', '追问：第一题？', [], '## 核心回答\n第一答案\n## 代码证据\nfirst.ts:2'),
    doc('second', '追问：第二题？'),
  ])
  const resolved = resolveFollowups(bank[0], bank)
  assert.deepEqual(resolved.map((item) => item.key), ['linked:second', 'linked:first', 'embedded:0'])
  assert.deepEqual(resolved.map((item) => item.title), ['第二题？', '第一题？', '题内问题？'])
  assert.deepEqual(resolved.map((item) => item.answer), ['答案', '第一答案', '题内回答'])
  assert.deepEqual(resolved.map((item) => item.evidence), [undefined, 'first.ts:2', '主问题.ts:1'])
  assert.deepEqual(resolved.map((item) => item.source), ['linked', 'linked', 'embedded'])
})

for (const [label, ids, target, reason] of [
  ['missing', ['absent'], doc('f', '追问：测试'), /absent.*不存在/],
  ['self', ['p'], doc('f', '追问：测试'), /p.*自身/],
  ['duplicate', ['f', 'f'], doc('f', '追问：测试'), /f.*重复/],
  ['wrong title', ['f'], doc('f', '普通题'), /f.*追问题/],
  ['empty core', ['f'], doc('f', '追问：测试', [], '## 核心回答\n  \n## 面试官可能追问\n- 尚未回答'), /f.*核心回答/],
]) test(`rejects ${label} with source and target context`, () => {
  assert.throws(() => buildQuestionBank([], [doc('p', '父题', ids), target]), (error) => {
    assert.match(error.message, /p.md（p）/)
    assert.match(error.message, reason)
    return true
  })
})

test('associations resolve only in their own bank even with identical IDs elsewhere', () => {
  const users = [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }]
  const owned = (user, document) => ({ ...document, name: `${user}/${document.name}` })
  assert.throws(() => buildRepositoryBanks(users, [owned('a', doc('p', '父题', ['f'])), owned('b', doc('f', '追问：其他用户'))]), /同一用户/)
  const banks = buildRepositoryBanks(users, [owned('a', doc('p', '父题', ['f'])), owned('a', doc('f', '追问：本用户')), owned('b', doc('f', '追问：其他用户'))])
  assert.equal(resolveFollowups(banks[0].questions[0], banks[0].questions)[0].title, '本用户')
})

test('pending prompts deduplicate exact normalized titles, retaining different questions', () => {
  assert.deepEqual(getPendingFollowups('- **为什么？**\n1. 怎么验证?\n- 怎么验证？\n- 为什么使用缓存？\n- WHY？', [{ title: '追问：为什么?', answer: '' }, { title: 'why?', answer: '' }]), ['怎么验证?', '为什么使用缓存？'])
  assert.deepEqual(getPendingFollowups(undefined, []), [])
})

test('all 95 Aaron standalone followups are explicitly referenced by same-project normal questions', () => {
  const root = new URL('../content/', import.meta.url)
  const documents = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.md')).map((name) => ({ name, raw: readFileSync(new URL(name, root), 'utf8') }))
  const users = JSON.parse(readFileSync(new URL('users.json', root), 'utf8'))
  const banks = buildRepositoryBanks(users, documents)
  const bank = banks.find((user) => user.id === 'aaron').questions
  const followups = bank.filter((question) => question.sourcePath.includes('/followups/'))
  assert.equal(followups.length, 95)
  for (const target of followups) {
    const parents = bank.filter((question) => question.followupIds.includes(target.id))
    assert.ok(parents.length, target.id)
    assert.ok(parents.every((parent) => parent.sourcePath.includes('/normal/') && parent.category === target.category), target.id)
  }
  const defaultBank = banks.find((user) => user.id === 'default').questions
  assert.ok(defaultBank.some((question) => resolveFollowups(question, defaultBank).some((item) => item.source === 'embedded')))
})
