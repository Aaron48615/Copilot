import type { InterviewQuestion, SearchResult } from './types'
import { getAnswerContent, parseAnswerSections } from './answers.ts'
import { normalize, pinyinMatchIndices, prepareSearchText } from './search-text.ts'
import type { PreparedSearchText } from './search-text.ts'

export interface RepositoryUser {
  id: string
  name: string
  questions: InterviewQuestion[]
}

export interface RepositoryUserDefinition {
  id: string
  name: string
  projects?: string[]
  identityMarkers?: string[]
}

// Ownership is explicit: copying a document must not copy another user's experience.
export function validateOwnership(user: RepositoryUserDefinition, users: RepositoryUserDefinition[], document: { name: string; raw: string }) {
  const question = parseMarkdown(document.name, document.raw)
  const projects = user.projects
  if (projects && question.projects.some((project) => !projects.includes(project))) {
    throw new Error(`${document.name}：项目不属于用户「${user.name}」`)
  }
  for (const other of users.filter((item) => item.id !== user.id)) {
    for (const marker of [...(other.projects || []), ...(other.identityMarkers || [])]) {
      if (document.raw.toLocaleLowerCase().includes(marker.toLocaleLowerCase())) {
        throw new Error(`${document.name}：混入用户「${other.name}」的内容「${marker}」`)
      }
    }
  }
}

export function buildRepositoryBanks(users: RepositoryUserDefinition[], documents: { name: string; raw: string }[]): RepositoryUser[] {
  if (!Array.isArray(users) || !users.length || users.some((user) => !user ||
    typeof user.id !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/.test(user.id) ||
    typeof user.name !== 'string' || !user.name.trim() ||
    [user.projects, user.identityMarkers].some((list) => list !== undefined &&
      (!Array.isArray(list) || list.some((item) => typeof item !== 'string' || !item.trim())))) ||
    new Set(users.map((user) => user.id)).size !== users.length) {
    throw new Error('content/users.json 需要唯一的用户 ID 和非空名称；ID 仅支持小写字母、数字、连字符和下划线；归属规则必须是非空字符串组成的数组')
  }
  const grouped = new Map(users.map((user) => [user.id, [] as typeof documents]))
  for (const document of documents) {
    const parts = document.name.split('/')
    const bank = grouped.get(parts[0])
    if (!bank || parts.length < 2 || parts.some((part) => !part || part === '.' || part === '..')) {
      throw new Error(`${document.name}：题目必须放在 content/<已配置的用户 ID>/ 目录中`)
    }
    validateOwnership(users.find((user) => user.id === parts[0])!, users, document)
    bank.push(document)
  }
  return users.map((user) => ({ ...user, questions: buildQuestionBank([], grouped.get(user.id)!) }))
}

export function buildQuestionBank(base: InterviewQuestion[], documents: { name: string; raw: string }[]) {
  const bank = new Map(base.map((question) => [question.id, question]))
  for (const document of documents) {
    const question = parseMarkdown(document.name, document.raw)
    if (bank.has(question.id)) throw new Error(`${document.name}：题目 ID「${question.id}」已存在`)
    bank.set(question.id, question)
  }
  for (const question of bank.values()) {
    const seen = new Set<string>()
    for (const id of question.followupIds) {
      const target = bank.get(id)
      let reason = ''
      if (id === question.id) reason = '不得引用自身'
      else if (seen.has(id)) reason = '重复关联'
      else if (!target) reason = '目标不存在于同一用户题库'
      else if (!target.title.startsWith('追问：')) reason = '目标必须是追问题'
      else if (!getAnswerContent(target).core.trim()) reason = '目标缺少核心回答'
      if (reason) throw new Error(`${question.sourcePath}（${question.id}）：followupIds「${id}」${reason}`)
      seen.add(id)
    }
  }
  return [...bank.values()]
}

const categoryLabels: Record<string, string> = {
  'current-interview': '本次面试',
  profile: '个人与求职',
  personal: '个人情况',
  'html-css': 'HTML / CSS',
  shiguang: '拾光集移动商城系统',
  yingke: '映刻影视',
  yunshu: '云枢智慧城市数据平台',
  html: 'HTML',
  css: 'CSS',
  browser: '浏览器',
  git: 'Git',
  webpack: 'Webpack',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  network: '网络',
  vue: 'Vue',
  react: 'React',
  engineering: '网络与工程化',
  'mobile-shop': '轻购',
  datapilot: '城市视图',
  'after-sales': '智服工单',
  'ai-agent': 'AI 与 Agent',
  coding: '代码题',
  testing: '测试与质量',
  'system-design': '前端设计题',
  'shiguangji-shop': '拾光集移动商城',
  'yingke-movies': '映刻影视',
  'yunshu-smart-city': '云枢智慧城市数据平台',
}

function parseList(value = '') {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '[]') return []
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }
  return [trimmed.replace(/^['"]|['"]$/g, '')]
}

export function parseMarkdown(sourcePath: string, raw: string): InterviewQuestion {
  raw = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/)
  const frontmatter = frontmatterMatch?.[1] ?? ''
  const meta: Record<string, string> = {}

  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    meta[line.slice(0, separator).trim()] = line.slice(separator + 1).trim()
  }

  const body = raw.slice(frontmatterMatch?.[0].length ?? 0)
  const sections = parseAnswerSections(body)

  if (!meta.id?.trim() || !meta.title?.trim() || !body.trim()) {
    throw new Error(`${sourcePath}：需要 id、title 和答案正文`)
  }
  const category = meta.category || 'engineering'
  return {
    id: meta.id,
    title: meta.title,
    aliases: parseList(meta.aliases),
    followupIds: parseList(meta.followupIds),
    category,
    categoryLabel: categoryLabels[category] || category,
    difficulty: meta.difficulty || '基础',
    priority: meta.priority || 'normal',
    projects: parseList(meta.projects),
    keywords: parseList(meta.keywords),
    sections,
    sourcePath,
  }
}

interface SearchQuery {
  normalized: string
  bigrams: string[]
}

interface QuestionSearchIndex {
  title: PreparedSearchText
  aliases: PreparedSearchText[]
  keywords: PreparedSearchText[]
  projects: PreparedSearchText[]
  category: PreparedSearchText
  followupNames: string[]
  followups: PreparedSearchText[]
  bodyText: string
  body: PreparedSearchText
}

const searchIndices = new WeakMap<InterviewQuestion, QuestionSearchIndex>()

function createQuery(value: string): SearchQuery {
  const normalized = normalize(value)
  return {
    normalized,
    bigrams: normalized.length < 2
      ? [normalized]
      : Array.from({ length: normalized.length - 1 }, (_, index) => normalized.slice(index, index + 2)),
  }
}

function indexQuestion(question: InterviewQuestion) {
  const cached = searchIndices.get(question)
  if (cached) return cached
  const followupNames = Object.keys(question.sections)
    .filter((name) => name.startsWith('追问：'))
    .map((name) => name.slice(3))
  const bodyText = Object.values(question.sections).join(' ')
  const index: QuestionSearchIndex = {
    title: prepareSearchText(question.title),
    aliases: question.aliases.map(prepareSearchText),
    keywords: question.keywords.map(prepareSearchText),
    projects: question.projects.map(prepareSearchText),
    category: prepareSearchText(question.categoryLabel),
    followupNames,
    followups: followupNames.map(prepareSearchText),
    bodyText,
    body: prepareSearchText(bodyText),
  }
  searchIndices.set(question, index)
  return index
}

export function prepareQuestionSearch(questions: InterviewQuestion[]) {
  questions.forEach(indexQuestion)
}

function similarity(query: SearchQuery, target: string, prepared: PreparedSearchText) {
  const q = query.normalized
  const t = prepared.normalized
  if (!q || !t) return 0
  if (q === t) return 120
  if (t.includes(q)) return 90 + Math.min(q.length, 20)
  if (q.includes(t)) return 70 + Math.min(t.length, 20)
  const overlap = query.bigrams.filter((pair) => prepared.bigrams.has(pair)).length
  const textScore = (overlap / Math.max(query.bigrams.length, prepared.bigrams.size, 1)) * 60
  const pinyinScore = pinyinMatchIndices(target, q)?.length
    ? 90 + Math.min(q.length, 20)
    : 0
  return Math.max(textScore, pinyinScore)
}

export function searchQuestions(questions: InterviewQuestion[], query: string, category = 'all'): SearchResult[] {
  const candidates = category === 'all'
    ? questions
    : questions.filter((question) => question.category === category)

  if (!query.trim()) {
    return candidates.map((question) => ({ question, score: 1 }))
  }

  const preparedQuery = createQuery(query)

  return candidates
    .map((question) => {
      const index = indexQuestion(question)
      const titleScore = similarity(preparedQuery, question.title, index.title)
      const aliasScore = Math.max(0, ...question.aliases.map((alias, aliasIndex) => similarity(preparedQuery, alias, index.aliases[aliasIndex]) + 8))
      // 短关键词（如“缓存”）只能召回候选，不能单独形成高置信度命中。
      const keywordScore = Math.max(0, ...question.keywords.map((keyword, keywordIndex) => similarity(preparedQuery, keyword, index.keywords[keywordIndex]) * 0.45))
      const projectScore = Math.max(0, ...question.projects.map((project, projectIndex) => similarity(preparedQuery, project, index.projects[projectIndex]) * 0.55))
      const categoryScore = similarity(preparedQuery, question.categoryLabel, index.category) * 0.7
      const followupScore = Math.max(0, ...index.followupNames.map((name, followupIndex) => similarity(preparedQuery, name, index.followups[followupIndex]) * 0.85))
      const bodyScore = similarity(preparedQuery, index.bodyText, index.body) * 0.35
      return { question, score: Math.max(titleScore, aliasScore, keywordScore, projectScore, categoryScore, bodyScore, followupScore) }
    })
    .filter((result) => result.score >= 12)
    .sort((a, b) => b.score - a.score)
}

export function getCategories(questions: InterviewQuestion[]) {
  return [
    { id: 'all', label: '全部题目' },
    ...Array.from(new Set(questions.map((question) => question.category)))
      .map((id) => ({ id, label: categoryLabels[id] || id })),
  ]
}

export interface SidebarCategory {
  id: string
  label: string
  count: number
}

export interface SidebarSection {
  id: 'previous' | 'current'
  label: string
  categories: SidebarCategory[]
}

const currentSidebarCategoryLabels: Record<string, string> = {
  'current:self-introduction': '自我介绍',
  'current:javascript': 'JavaScript',
  'current:typescript': 'TypeScript',
  'current:html-css': 'HTML / CSS',
  'current:vue': 'Vue',
  'current:react': 'React',
  'current:project-light-shop': '项目 · 轻购',
  'current:project-city': '项目 · 城市视图',
  'current:project-work-order': '项目 · 智服工单',
  'current:project-style3d': '项目 · style3D',
  'current:project-general': '项目 · 综合',
  'current:network': '网络与工程化',
  'current:performance': '性能与调试',
  'current:git': 'Git',
  'current:ai': 'AI 工具',
  'current:coding': '代码题',
  'current:testing': '测试与质量',
  'current:system-design': '前端设计题',
  'current:frameworks': '其他框架',
  'current:other': '其他知识点',
}

const currentSidebarCategoryOrder = [
  'current:self-introduction',
  'current:javascript',
  'current:typescript',
  'current:html-css',
  'current:vue',
  'current:react',
  'current:project-light-shop',
  'current:project-city',
  'current:project-work-order',
  'current:project-style3d',
  'current:project-general',
  'current:network',
  'current:performance',
  'current:git',
  'current:ai',
  'current:coding',
  'current:testing',
  'current:system-design',
  'current:frameworks',
  'current:other',
]

function currentInterviewSidebarCategory(question: InterviewQuestion) {
  const source = question.sourcePath.toLocaleLowerCase()

  if (source.includes('00-self-introduction')) return 'current:self-introduction'
  if (source.includes('01-project-overview') || source.includes('03-auth') || source.includes('19-resume-project-depth')) {
    return 'current:project-general'
  }
  if (source.includes('02-light-shop') || source.includes('04-search') || source.includes('05-cart')) {
    return 'current:project-light-shop'
  }
  if (source.includes('06-city') || source.includes('07-chart') || source.includes('08-map')) {
    return 'current:project-city'
  }
  if (source.includes('09-work-order')) return 'current:project-work-order'
  if (source.includes('20-style3d')) return 'current:project-style3d'
  if (source.includes('18-ai-tools-and-ownership') || source.includes('import-06-ai-agent')) return 'current:ai'
  if (source.includes('typescript') || /import-02-javascript-(api-state-union|conditional-infer|discriminated-union|function-overload|generic-api|interface-type|runtime-validation|tsconfig-strict|unknown-never)/.test(source)) {
    return 'current:typescript'
  }
  if (source.includes('import-01-html-css') || source.includes('14-css')) return 'current:html-css'
  if (source.includes('import-03-frameworks-vue') || source.includes('/12-vue')) return 'current:vue'
  if (source.includes('import-03-frameworks-react') || source.includes('/13-react')) return 'current:react'
  if (source.includes('import-03-frameworks')) return 'current:frameworks'
  if (source.includes('10-javascript') || source.includes('11-javascript') || source.includes('import-02-javascript')) {
    return 'current:javascript'
  }
  if (source.includes('import-07-testing')) return 'current:testing'
  if (source.includes('import-08-coding')) return 'current:coding'
  if (source.includes('import-09-system-design')) return 'current:system-design'
  if (source.includes('/17-git') || source.includes('import-05-git')) return 'current:git'
  if (source.includes('/16-debug') || source.includes('import-04-browser-network-engineering')) {
    return /performance|web-vitals|browser-reflow|browser-render|monitoring|resource-loading|waterfall|optimization|tree-shaking|code-splitting|lazy/.test(source)
      ? 'current:performance'
      : 'current:network'
  }
  if (source.includes('/15-network')) return 'current:network'

  if (question.projects.includes('轻购')) return 'current:project-light-shop'
  if (question.projects.includes('城市视图')) return 'current:project-city'
  if (question.projects.includes('智服工单')) return 'current:project-work-order'
  if (question.projects.includes('style3D')) return 'current:project-style3d'
  return 'current:other'
}

export function getSidebarCategory(question: InterviewQuestion) {
  return question.category === 'current-interview'
    ? currentInterviewSidebarCategory(question)
    : `previous:${question.category}`
}

export function getSidebarCategoryLabel(id: string) {
  if (id === 'previous:all') return '全部之前的题库'
  if (id === 'current:all') return '全部本次面试'
  if (id.startsWith('previous:')) return categoryLabels[id.slice('previous:'.length)] || id.slice('previous:'.length)
  return currentSidebarCategoryLabels[id] || id
}

export function getSidebarSections(questions: InterviewQuestion[]): SidebarSection[] {
  const previousQuestions = questions.filter((question) => question.category !== 'current-interview')
  const currentQuestions = questions.filter((question) => question.category === 'current-interview')
  const previousCategories = getCategories(previousQuestions)
    .filter((item) => item.id !== 'all')
    .map((item) => ({
      id: `previous:${item.id}`,
      label: item.label,
      count: previousQuestions.filter((question) => question.category === item.id).length,
    }))
  const currentIds = new Set(currentQuestions.map(getSidebarCategory))
  const currentCategories = currentSidebarCategoryOrder
    .filter((id) => currentIds.has(id))
    .map((id) => ({
      id,
      label: getSidebarCategoryLabel(id),
      count: currentQuestions.filter((question) => getSidebarCategory(question) === id).length,
    }))

  return [
    previousQuestions.length ? {
      id: 'previous' as const,
      label: '之前的题库',
      categories: [
        { id: 'previous:all', label: getSidebarCategoryLabel('previous:all'), count: previousQuestions.length },
        ...previousCategories,
      ],
    } : null,
    currentQuestions.length ? {
      id: 'current' as const,
      label: '这次面试',
      categories: [
        { id: 'current:all', label: getSidebarCategoryLabel('current:all'), count: currentQuestions.length },
        ...currentCategories,
      ],
    } : null,
  ].filter((section): section is SidebarSection => section !== null)
}

export function matchesSidebarCategory(question: InterviewQuestion, id: string) {
  if (id === 'previous:all') return question.category !== 'current-interview'
  if (id === 'current:all') return question.category === 'current-interview'
  return getSidebarCategory(question) === id
}
