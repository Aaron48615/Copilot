import { retrieve, describeMatch } from './resolve.mjs'
import { reliableAnswerMatch, cleanQuery } from '../src/query-search.ts'
import { normalize } from '../src/search-text.ts'
import { getSidebarCategory } from '../src/question-bank.ts'
const key = (item) => `${item.question.id}:${item.followupIndex ?? 'core'}`
export function fuseMatches(lexical, semantic) {
  const entries = new Map()
  for (const [list, weight] of [[lexical, 1], [semantic, 2]]) list.slice(0, 30).forEach((item, rank) => {
    const id = key(item)
    const result = entries.get(id) || { ...item, score: 0, semanticScore: 0 }
    result.score += weight / (20 + rank)
    if (list === semantic) result.semanticScore = item.score
    entries.set(id, result)
  })
  return [...entries.values()].sort((a,b) => b.score - a.score)
}
export async function resolveHybrid({ user, question, contextQuestionId, semanticIndex, projects = [], signal }) {
  const scoped = projects.filter((p) => (p.aliases || [p.name]).some((name) => question.toLowerCase().includes(name.toLowerCase())))
  const comparingProjects = /项目/u.test(question) && /区别|对比|比较|不同/u.test(question) && (scoped.length > 1 || /两个|这两|这几个|各个/u.test(question))
  const frameworks = ['vue', 'react'].filter((name) => new RegExp(`\\b${name}\\b`, 'i').test(question))
  // Explicit framework/project names constrain both recall channels, not just the final winner.
  const inScope = (item) => {
    if (scoped.length && !item.question.projects.some((name) => scoped.some((p) => p.name === name))) return false
    if (frameworks.length === 1) {
      const category = getSidebarCategory(item.question)
      const text = `${category} ${item.question.title}`.toLowerCase()
      return text.includes(frameworks[0])
    }
    return true
  }
  const lexical = retrieve(user, question).filter(inScope)
  const direct = reliableAnswerMatch(lexical, question, contextQuestionId)
  if (direct) return { match: describeMatch(direct), method: 'exact' }
  const status = semanticIndex.status()
  if (status.status !== 'ready') return { candidates: lexical.slice(0, 5).map(describeMatch), reason: status.status === 'loading' ? '语义索引正在准备，先显示关键词候选。' : '本地语义服务不可用，先显示关键词候选。', method: 'lexical' }
  const current = user.questions.find((item) => item.id === contextQuestionId)
  const isFollowup = question.length <= 35 && /^(那|这样|这个|这种|它|如果失败|为什么这样)/u.test(question.trim())
  const semanticQuery = isFollowup && current ? `${current.title}。${question}` : question
  const semantic = (await semanticIndex.search(user.id, semanticQuery, signal)).filter(inScope)
  const fused = fuseMatches(lexical, semantic)
  const first = fused[0]
  const second = first && semantic.find((item) => normalize(describeMatch(item).title) !== normalize(describeMatch(first).title))
  const wrongProject = first && scoped.length && !first.question.projects.some((name) => scoped.some((p) => p.name === name))
  // Scores are cosine similarities, not probabilities. Favor suggestions over a wrong automatic jump.
  if (first && !comparingProjects && !wrongProject && cleanQuery(question).length >= 6 && first.semanticScore >= 0.68 && lexical.slice(0, 5).some((item) => key(item) === key(first)) &&
      semantic[0] && key(semantic[0]) === key(first) &&
      first.semanticScore - (second?.score || 0) >= 0.018) {
    return { match: describeMatch(first), method: 'hybrid' }
  }
  if (!comparingProjects && ((semantic[0]?.score || 0) >= 0.62 || cleanQuery(question).length < 6)) return {
    candidates: [...new Map([fused[0], lexical[0], ...fused].filter(Boolean).map((item) => [key(item), item])).values()].slice(0, 5).map(describeMatch), reason: '找到几个相近问题，选择与你的问题最接近的一项。', method: 'hybrid',
  }
  return { related: fused.slice(0, 3).map(describeMatch), queries: [semanticQuery], current: isFollowup && current ? describeMatch({ question: current }) : undefined, projectIds: comparingProjects ? (scoped.length > 1 ? scoped : projects).map((p) => p.id) : scoped.length ? scoped.map((p) => p.id) : isFollowup && current ? projects.filter((p) => current.projects.includes(p.name)).map((p) => p.id) : [], method: 'generate' }
}
