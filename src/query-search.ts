import { createLexicalIndex } from './retrieval.ts'
import { searchQuestions } from './question-bank.ts'
import { normalize } from './search-text.ts'
import { getAnswerContent } from './answers.ts'
import type { InterviewQuestion, SearchResult } from './types'

export function cleanQuery(text: string) {
  return text.trim()
    .replace(/^(?:嗯[，,、\s]*|呃[，,、\s]*|那个[，,、\s]*|请问[，,、\s]*|我想问一下[，,、\s]*|你能不能|你能|能不能|可以|请|给我|帮我|讲一下|讲讲|说一下|介绍一下|解释一下|谈谈)+/u, '')
    .replace(/[，,。.!！?？\s]*(?:呢|吗|吧)?[。.!！?？\s]*$/u, '')
    .replace(/type\s*script/ig, 'TypeScript').replace(/java\s*script/ig, 'JavaScript')
    .replace(/react\s*js/ig, 'React').trim()
}

export interface AnswerMatch extends SearchResult { followupIndex?: number }

// Index embedded answers as search candidates, so matching a followup opens its answer.
export function answerCandidates(questions: InterviewQuestion[]): { question: InterviewQuestion; parent: InterviewQuestion; followupIndex?: number }[] {
  return questions.flatMap((question) => [
    { question, parent: question },
    ...getAnswerContent(question).followups.map((followup, followupIndex) => ({
      parent: question, followupIndex,
      question: { ...question, id: `${question.id}::${followupIndex}`, title: followup.title, aliases: [], keywords: [], sections: { '核心回答': followup.answer } },
    })),
  ])
}

const recallIndices = new WeakMap<ReturnType<typeof answerCandidates>, ReturnType<typeof createLexicalIndex<ReturnType<typeof answerCandidates>[number]>>>()

const cachedSearch = new WeakMap<ReturnType<typeof answerCandidates>, { query: string; results: AnswerMatch[] }>()

export function searchCandidates(candidates: ReturnType<typeof answerCandidates>, text: string): AnswerMatch[] {
  const query = cleanQuery(text)
  const cached = cachedSearch.get(candidates)
  if (cached?.query === query) return cached.results
  const byId = new Map(candidates.map((item) => [item.question.id, item]))
  const results = searchQuestions(candidates.map((item) => item.question), query).map((result) => {
    const item = byId.get(result.question.id)!
    return { question: item.parent, score: result.score * 0.35, followupIndex: item.followupIndex }
  })
  let recall = recallIndices.get(candidates)
  if (!recall) {
    recall = createLexicalIndex(candidates, (item) => [item.question.title, ...item.question.aliases, ...item.question.keywords, ...item.question.projects, getAnswerContent(item.question).core.slice(0, 1400)].join(' '))
    recallIndices.set(candidates, recall)
  }
  const ranked = recall(query, 40)
  for (const { item, score } of ranked) {
    const existing = results.find((result) => result.question.id === item.parent.id && result.followupIndex === item.followupIndex)
    const recallScore = 70 * score / Math.max(ranked[0]?.score || 1, 1)
    if (existing) existing.score += recallScore
    else results.push({ question: item.parent, followupIndex: item.followupIndex, score: recallScore })
  }
  for (const result of results) {
    const titles = result.followupIndex === undefined ? [result.question.title, ...result.question.aliases]
      : [getAnswerContent(result.question).followups[result.followupIndex].title]
    if (titles.some((title) => normalize(cleanQuery(title)) === normalize(query))) result.score = 200
  }
  results.sort((a, b) => b.score - a.score)
  cachedSearch.set(candidates, { query, results })
  return results
}

export function reliableAnswerMatch(results: AnswerMatch[], text: string, contextQuestionId?: string): AnswerMatch | undefined {
  const first = results[0]
  if (!first || !getAnswerContent(first.question).core && first.followupIndex === undefined) return
  const q = normalize(cleanQuery(text))
  if (!q || ['缓存', '权限', '错误', '请求', '失败', '项目'].includes(q)) return
  const exact = (item: AnswerMatch) => {
    const titles = item.followupIndex === undefined
      ? [item.question.title, ...item.question.aliases]
      : [getAnswerContent(item.question).followups[item.followupIndex].title]
    return titles.some((title) => normalize(cleanQuery(title)) === q)
  }
  if (exact(first)) {
    const contextual = results.find((item) => item.question.id === contextQuestionId && exact(item))
    if (contextual) return contextual
    const ambiguous = results.some((item) => item !== first && item.question.id !== first.question.id && exact(item))
    // Identical embedded prompts belong to different projects; do not pick one blindly.
    if (ambiguous && (first.followupIndex !== undefined || first.question.projects.length || q.length < 4)) return
    return first
  }
  // Non-exact matches require semantic verification of the complete question.
}
