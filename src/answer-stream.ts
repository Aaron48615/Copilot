export interface CodeSource { id: string; project: string; path: string; start: number; end: number; text: string; revision: string }
export interface ProjectStatus { id: string; name: string; files: number; skipped?: number; error?: string }
export interface LibraryMatch { questionId: string; followupIndex?: number; title?: string }
export interface CandidateResponse { candidates: LibraryMatch[]; reason: string }
export interface AnswerMetadata { sources: CodeSource[]; projects: ProjectStatus[] }
export async function readAnswer(response: Response, onText: (text: string) => void, onMetadata?: (data: AnswerMetadata) => void, onMatch?: (match: LibraryMatch) => void, onCandidates?: (data: CandidateResponse) => void) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error?.message || data.error || `回答服务请求失败（${response.status}）`)
  }
  if (!response.headers.get('content-type')?.includes('text/event-stream')) {
    const data = await response.json()
    if (data.kind === 'candidates' && onCandidates) { onCandidates(data); return }
    if (data.kind === 'library' && onMatch) { onMatch(data.match); return }
    if (!data.answer?.trim()) throw new Error('回答服务没有返回有效内容。')
    onText(data.answer)
    return
  }
  if (!response.body) throw new Error('回答服务未返回数据流。')
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = '', answer = '', finished = false
  const event = (block: string) => {
    const data = block.split('\n').filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trimStart()).join('\n')
    if (!data) return
    if (data === '[DONE]') { finished = true; return }
    const chunk = JSON.parse(data)
    if (chunk.error) throw new Error(chunk.error.message || '回答生成中断，请重试。')
    if (Array.isArray(chunk.sources)) onMetadata?.({ sources: chunk.sources, projects: chunk.projects || [] })
    const text = chunk.choices?.[0]?.delta?.content
    if (typeof text === 'string') { answer += text; onText(answer) }
  }
  try {
    while (!finished) {
      const { value, done } = await reader.read()
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true })
      // Normalize CRLF only once the complete delimiter has arrived.
      let match: RegExpExecArray | null
      while ((match = /\r?\n\r?\n/.exec(buffer))) {
        event(buffer.slice(0, match.index).replace(/\r\n/g, '\n'))
        buffer = buffer.slice(match.index + match[0].length)
        if (finished) break
      }
      if (done) { if (buffer.trim()) event(buffer.replace(/\r\n/g, '\n')); break }
    }
    if (!finished) throw new Error('回答连接中断，请重试。')
    if (!answer.trim()) throw new Error('模型没有返回有效回答，请重试。')
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock() }
}
