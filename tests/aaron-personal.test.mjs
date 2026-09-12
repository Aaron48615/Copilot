import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { parseMarkdown, getSidebarSections, matchesSidebarCategory, searchQuestions } from '../src/question-bank.ts'
const root = new URL('../', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('tests/fixtures/aaron-personal.json', root), 'utf8'))
test('14 personal source questions retain their answers and join the existing personal category', () => {
  assert.equal(manifest.questions.length, 14)
  const questions = readdirSync(new URL('content/aaron/personal/', root)).map(name => {
    const path = `content/aaron/personal/${name}`
    return parseMarkdown(path, readFileSync(new URL(path, root), 'utf8'))
  })
  assert.equal(questions.length, 16)
  assert.equal(new Set(questions.map(q => q.id)).size, 16)
  for (const item of manifest.questions) {
    const raw = readFileSync(new URL(item.path, root), 'utf8')
    const header = raw.match(/^---\n([\s\S]*?)\n---\n/)
    assert.ok(header)
    assert.deepEqual(header[1].split('\n').map(line => line.split(':')[0]), ['id','title','aliases','category','difficulty','priority','projects','keywords'])
    const q = parseMarkdown(item.path, raw)
    assert.equal(q.title, item.title)
    assert.equal(q.category, 'personal')
    assert.deepEqual(q.projects, [])
    assert.deepEqual(Object.keys(q.sections), ['核心回答'])
    assert.deepEqual([...raw.matchAll(/^# (.+)$/gm)].map(m => m[1]), [q.title])
    assert.equal(createHash('sha256').update(q.sections['核心回答']).digest('hex'), item.sha256)
    assert.ok(searchQuestions(questions, q.title).some(result => result.question.id === q.id))
  }
  const categories = getSidebarSections(questions).flatMap(section => section.categories)
  assert.deepEqual(categories, [{ id: 'previous:all', label: '全部之前的题库', count: 16 }, { id: 'previous:personal', label: '个人情况', count: 16 }])
  assert.ok(questions.every(q => matchesSidebarCategory(q, 'previous:personal')))
})
