import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { buildRepositoryBanks, getSidebarSections, matchesSidebarCategory, searchQuestions, parseMarkdown } from '../src/question-bank.ts'
import { getAnswerContent } from '../src/answers.ts'

const manifest = JSON.parse(readFileSync(new URL('./fixtures/aaron-basics.json', import.meta.url), 'utf8'))
const root = new URL('../', import.meta.url)
const counts = {"html": 14, "css": 22, "javascript": 28, "git": 12, "react": 17, "vue": 25, "browser": 23, "webpack": 17, "typescript": 6, "network": 19, "testing": 1, "ai-agent": 10, "engineering": 8}
const labels = { html: 'HTML', css: 'CSS', javascript: 'JavaScript', vue: 'Vue', react: 'React', browser: '浏览器', git: 'Git', webpack: 'Webpack', typescript: 'TypeScript', network: '网络', testing: '测试与质量', 'ai-agent': 'AI 与 Agent', engineering: '网络与工程化' }
const questions = manifest.map(item => parseMarkdown(item.path, readFileSync(new URL(item.path, root), 'utf8')))

// Example code may contain HTTP or shell comments beginning with #.
// Only headings outside fenced code identify Markdown questions.
function proseHeadings(raw) {
  let fence = null
  const headings = []
  for (const line of raw.split('\n')) {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/)
    if (marker && !fence) {
      fence = marker[1]
    } else if (marker && marker[1][0] === fence?.[0] && marker[1].length >= fence.length && !marker[2].trim()) {
      fence = null
    } else if (!fence && line.startsWith('# ')) {
      headings.push(line.slice(2))
    }
  }
  assert.equal(fence, null, '代码围栏必须闭合')
  return headings
}

test('all 202 entries retain imported or approved revised answers with eight ordered fields', () => {
  const files = readdirSync(new URL('content/aaron/basics/', root), { recursive: true }).filter(name => name.endsWith('.md'))
  assert.deepEqual(files.sort(), manifest.map(item => item.path.replace('content/aaron/basics/', '')).sort())
  assert.equal(new Set(manifest.map(item => `${item.source}:${item.number}`)).size, 202)
  for (const [index, item] of manifest.entries()) {
    const raw = readFileSync(new URL(item.path, root), 'utf8')
    const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n/)
    assert.ok(frontmatter, item.path)
    assert.deepEqual(frontmatter[1].split('\n').map(line => line.split(':')[0]), ['id', 'title', 'aliases', 'category', 'difficulty', 'priority', 'projects', 'keywords'])
    for (const key of ['aliases', 'projects', 'keywords']) assert.match(frontmatter[1], new RegExp(`^${key}: \\[.*\\]$`, 'm'))
    const q = questions[index]
    assert.equal(q.title, item.title)
    assert.equal(q.category, item.category)
    assert.match(item.path, new RegExp(`/basics/${q.category}/[a-z0-9-]+\\.md$`))
    assert.ok(q.id.startsWith(`aaron-basic-${q.category}-`))
    assert.deepEqual(Object.keys(q.sections), ['核心回答'])
    assert.deepEqual(proseHeadings(raw), [item.title])
    assert.ok(q.aliases.length >= 2 && q.aliases.length <= 4)
    assert.ok(q.keywords.length >= 3 && q.keywords.length <= 6)
    assert.ok(['基础', '进阶', '深入'].includes(q.difficulty))
    assert.ok(['high', 'normal'].includes(q.priority))
    assert.deepEqual(q.projects, [])
    let answer = getAnswerContent(q).core
    if (item.path.endsWith('/practice-placeholder.md')) {
      assert.ok(answer.startsWith('原文未提供答案，待补充\n\n'))
      answer = answer.slice('原文未提供答案，待补充\n\n'.length)
    }
    assert.equal(createHash('sha256').update(answer).digest('hex'), item.sha256, `已确认答案变化：${item.path}`)
  }
})

test('all categories have the expected sidebar labels, counts and exclusive filtered results', () => {
  const sections = getSidebarSections(questions)
  assert.equal(sections.length, 1)
  for (const [category, count] of Object.entries(counts)) {
    const id = `previous:${category}`
    assert.deepEqual(sections[0].categories.find(item => item.id === id), { id, label: labels[category], count })
    const filtered = questions.filter(q => matchesSidebarCategory(q, id))
    assert.equal(filtered.length, count)
    assert.ok(filtered.every(q => q.category === category))
    for (const q of filtered) assert.ok(searchQuestions(filtered, q.title).some(result => result.question.id === q.id))
  }
})

test('Aaron ownership rules remain enforced and permit genuinely registered future projects', () => {
  const registry = JSON.parse(readFileSync(new URL('content/users.json', root), 'utf8'))
  const aaron = registry.find(user => user.id === 'aaron')
  const doc = { name: 'aaron/project.md', raw: '---\nid: future-project\ntitle: 项目问题\nprojects: [测试项目]\n---\n\n## 核心回答\n测试回答' }
  assert.throws(() => buildRepositoryBanks(registry, [doc]), /项目不属于/)
  const future = registry.map(user => user === aaron ? { ...user, projects: ['测试项目'] } : user)
  assert.equal(buildRepositoryBanks(future, [doc]).find(user => user.id === 'aaron').questions.length, 1)
  const foreign = { ...doc, raw: doc.raw.replace('测试项目', registry[0].projects[0]) }
  assert.throws(() => buildRepositoryBanks(registry, [foreign]), /项目不属于|混入/)
})
