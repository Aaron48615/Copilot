import { searchQuestions } from './question-bank.ts'
import { normalize } from './search-text.ts'
import { getAnswerContent } from './answers.ts'
import type { InterviewQuestion, SearchResult } from './types'

export function cleanSpeech(text: string) {
  return text.trim()
    .replace(/^(?:嗯[，,、\s]*|呃[，,、\s]*|那个[，,、\s]*|请问[，,、\s]*|我想问一下[，,、\s]*|你能不能|你能|能不能|可以|请|给我|帮我|讲一下|讲讲|说一下|介绍一下|解释一下|谈谈)+/u, '')
    .replace(/[，,。.!！?？\s]*(?:呢|吗|吧)?[。.!！?？\s]*$/u, '')
    .replace(/type\s*script/ig, 'TypeScript').replace(/java\s*script/ig, 'JavaScript')
    .replace(/react\s*js/ig, 'React').trim()
}

export interface VoiceMatch extends SearchResult { followupIndex?: number }

// Index embedded answers as search candidates, so matching a followup opens its answer.
export function voiceCandidates(questions: InterviewQuestion[]): { question: InterviewQuestion; parent: InterviewQuestion; followupIndex?: number }[] {
  return questions.flatMap((question) => [
    { question, parent: question },
    ...getAnswerContent(question).followups.map((followup, followupIndex) => ({
      parent: question, followupIndex,
      question: { ...question, id: `${question.id}::${followupIndex}`, title: followup.title, aliases: [], keywords: [], sections: { '核心回答': followup.answer } },
    })),
  ])
}

const cachedSearch = new WeakMap<ReturnType<typeof voiceCandidates>, { query: string; results: VoiceMatch[] }>()

export function searchVoice(candidates: ReturnType<typeof voiceCandidates>, text: string): VoiceMatch[] {
  const query = cleanSpeech(text)
  const cached = cachedSearch.get(candidates)
  if (cached?.query === query) return cached.results
  const byId = new Map(candidates.map((item) => [item.question.id, item]))
  const results = searchQuestions(candidates.map((item) => item.question), query).map((result) => {
    const item = byId.get(result.question.id)!
    return { question: item.parent, score: result.score, followupIndex: item.followupIndex }
  })
  cachedSearch.set(candidates, { query, results })
  return results
}

export function reliableVoiceMatch(results: VoiceMatch[], text: string, contextQuestionId?: string): VoiceMatch | undefined {
  const first = results[0]
  if (!first || !getAnswerContent(first.question).core && first.followupIndex === undefined) return
  const q = normalize(cleanSpeech(text))
  const exact = (item: VoiceMatch) => {
    const titles = item.followupIndex === undefined
      ? [item.question.title, ...item.question.aliases]
      : [getAnswerContent(item.question).followups[item.followupIndex].title]
    return titles.some((title) => normalize(cleanSpeech(title)) === q ||
      q.length >= 4 && normalize(cleanSpeech(title.split(/[？?；;。]/u)[0])) === q)
  }
  if (exact(first)) {
    const contextual = results.find((item) => item.question.id === contextQuestionId && exact(item))
    if (contextual) return contextual
    const ambiguous = results.some((item) => item !== first && item.question.id !== first.question.id && exact(item))
    // Identical embedded prompts belong to different projects; do not pick one blindly.
    if (ambiguous && (first.followupIndex !== undefined || q.length < 4)) return
    return first
  }
  // A broad term or multiple nearly equal answers should fall back instead of claiming certainty.
  const second = results.find((item) => item.question.id !== first.question.id || item.followupIndex !== first.followupIndex)
  if (q.length >= 4 && first.score >= 60 && first.score - (second?.score || 0) >= 12) return first
}
