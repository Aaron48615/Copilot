import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { buildRepositoryBanks, parseMarkdown, getSidebarSections, matchesSidebarCategory, searchQuestions } from '../src/question-bank.ts'

const root = new URL('../', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('tests/fixtures/aaron-projects.json', root), 'utf8')).questions
const projects = {
  shiguang: ['拾光集移动商城系统', 28, 32],
  yingke: ['映刻影视', 30, 46],
  yunshu: ['云枢智慧城市数据平台', 33, 28],
}
const hash = text => createHash('sha256').update(text).digest('hex')

test('197 project questions preserve source answers, evidence, titles and type labels', () => {
  assert.equal(manifest.length, 197)
  for (const [category, [name, normal, followups]] of Object.entries(projects)) {
    const files = readdirSync(new URL(`content/aaron/${category}/`, root), { recursive: true }).filter(file => file.endsWith('.md'))
    const records = manifest.filter(item => item.path.startsWith(`${category}/`))
    assert.deepEqual(files.sort(), records.map(item => item.path.slice(category.length + 1)).sort())
    assert.equal(files.filter(file => file.startsWith('normal/')).length, normal)
    assert.equal(files.filter(file => file.startsWith('followups/')).length, followups)
    for (const item of records) {
      const raw = readFileSync(new URL(`content/aaron/${item.path}`, root), 'utf8')
      const q = parseMarkdown(item.path, raw)
      const fields = raw.match(/^---\n([\s\S]*?)\n---\n/)[1].split('\n')
      assert.deepEqual(fields.map(line => line.split(':')[0]), ['id', 'title', 'aliases', 'category', 'difficulty', 'priority', 'projects', 'keywords'])
      for (const key of ['aliases', 'projects', 'keywords']) assert.ok(fields.some(line => line.startsWith(`${key}: [`) && line.endsWith(']')))
      assert.equal(q.id, item.id)
      assert.equal(q.title, item.title)
      assert.deepEqual([...raw.matchAll(/^# (.+)$/gm)].map(match => match[1]), [q.title])
      assert.equal(q.category, category)
      assert.deepEqual(q.projects, [name])
      assert.deepEqual(Object.keys(q.sections), ['核心回答', '回答要点', '面试官可能追问', '代码证据'])
      assert.equal(hash(q.sections['核心回答']), item.answerSha256, item.path)
      assert.equal(hash(q.sections['代码证据']), item.evidenceSha256, item.path)
      assert.ok(q.aliases.length >= 2 && q.aliases.length <= 4)
      assert.ok(q.keywords.length >= 3 && q.keywords.length <= 6)
      assert.ok(['基础', '进阶', '深入'].includes(q.difficulty))
      assert.ok(['high', 'normal'].includes(q.priority))
      if (item.type) assert.equal(q.keywords[0], item.type)
      if (item.path.includes('/followups/')) {
        assert.ok(q.title.startsWith('追问：'))
        assert.equal(q.title.split('追问：').length, 2)
      }
    }
    for (const type of ['难点', '亮点', '不足']) {
      records.filter(item => item.type === type).forEach((item, index) => assert.ok(item.title.startsWith(`${type}${'一二三四五六七八九十'[index]}：`)))
    }
  }
})

test('Aaron project ownership, category counts, filtering and search work alongside basics', () => {
  const content = new URL('content/', root)
  const registry = JSON.parse(readFileSync(new URL('users.json', content), 'utf8'))
  const docs = readdirSync(content, { recursive: true }).filter(name => name.endsWith('.md')).map(name => ({ name, raw: readFileSync(new URL(name, content), 'utf8') }))
  const banks = buildRepositoryBanks(registry, docs)
  const questions = banks.find(user => user.id === 'aaron').questions
  assert.equal(questions.length, 415)
  assert.equal(new Set(questions.map(q => q.id)).size, 415)
  assert.equal(banks.find(user => user.id === 'default').questions.length, 537)
  const categories = getSidebarSections(questions).flatMap(section => section.categories)
  for (const [category, [label, normal, followups]] of Object.entries(projects)) {
    const id = `previous:${category}`
    assert.deepEqual(categories.find(item => item.id === id), { id, label, count: normal + followups })
    const filtered = questions.filter(q => matchesSidebarCategory(q, id))
    assert.equal(filtered.length, normal + followups)
    for (const q of filtered) assert.ok(searchQuestions(filtered, q.title).some(result => result.question.id === q.id))
  }
  const foreign = { name: 'aaron/foreign.md', raw: '---\nid: foreign-project\ntitle: 外部项目\nprojects: [轻购]\n---\n\n## 核心回答\n测试' }
  assert.throws(() => buildRepositoryBanks(registry, [foreign]), /项目不属于|混入/)
})
