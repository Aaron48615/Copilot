import { useState } from 'react'
import type { InterviewQuestion } from './types'
import { filterFollowups, getAnswerContent, getPendingFollowups, resolveFollowups } from './answers'
import { renderEvidence, renderText } from './TextContent'

// Both layouts render these same slots and keep their selection in UserWorkspace.
export function useLibraryAnswer(question: InterviewQuestion | undefined, questions: InterviewQuestion[], activeKey: string, select: (key: string) => void) {
  const [filterState, setFilterState] = useState({ questionId: '', value: '' })
  const filter = filterState.questionId === question?.id ? filterState.value : ''
  const setFilter = (value: string) => setFilterState({ questionId: question?.id || '', value })
  const content = question ? getAnswerContent(question) : undefined
  const followups = question ? resolveFollowups(question, questions) : []
  const active = followups.find((item) => item.key === activeKey)
  const matches = filterFollowups(followups, filter)
  const pending = getPendingFollowups(content?.prompts, followups)
  const evidence = active ? active.evidence : content?.evidence

  return {
    activeKey: active?.key || '',
    modes: <div className="answer-modes" role="group" aria-label="回答模式">
      <button aria-pressed={!active} onClick={() => select('')}>核心回答</button>
      <button aria-pressed={!!active} disabled={!followups.length} onClick={() => select(active?.key || followups[0].key)}>追问速查 <span>{followups.length}</span></button>
    </div>,
    body: <div key={`${question?.id}:${active?.key || ''}`} className="library-answer-body">
      {active ? <section className="answer-card followup-answer" aria-label="追问回答" tabIndex={0}>
        <div className="section-title"><strong>被问到这里，再这样说</strong></div>
        <h3>{active.title}</h3><div className="answer-body">{renderText(active.answer)}</div>
      </section> : <>
        {content?.core && <section className="answer-card core">
          <div className="section-title"><strong>先这样回答</strong></div>
          <div className="answer-body">{renderText(content.core)}</div>
        </section>}
        {content?.otherSections.map(([name, text]) => <section key={name} className="answer-card">
          <div className="section-title"><strong>{name}</strong></div><div className="answer-body">{renderText(text)}</div>
        </section>)}
        {!content?.core && !content?.otherSections.length && <p>暂无核心回答，请选择其他题目。</p>}
      </>}
    </div>,
    evidence: evidence ? renderEvidence(evidence) : <p className="wb-empty">暂无代码依据</p>,
    followups: <div className="library-followups">
      {followups.length ? <div className="followup-finder">
        <label htmlFor="followup-search">查本题追问 · {followups.length} 道已整理</label>
        <div className="followup-search">
          <input id="followup-search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="输入关键词，如：并发、为什么、失败" />
          {filter && <button aria-label="清空追问搜索" onClick={() => setFilter('')}>×</button>}
        </div>
        <nav className="followup-options" aria-label="选择追问">
          {matches.map((item, index) => <button key={item.key} aria-pressed={active?.key === item.key} onClick={() => select(item.key)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
          </button>)}
        </nav>
        {!matches.length && <div className="followup-empty" role="status"><p>本题没有匹配的追问，试试更短的关键词。</p><button onClick={() => setFilter('')}>查看全部追问</button></div>}
      </div> : <p className="wb-empty">本题暂无已整理追问</p>}
      {content?.points && <section className="answer-notes"><h3>回答要点</h3>{renderText(content.points)}</section>}
      {!!pending.length && <section className="answer-notes"><h3>其他待准备的追问</h3>{pending.map((title) => <div className="wb-pending" key={title}><p>{title}</p><small>暂无已整理答案</small></div>)}</section>}
    </div>,
  }
}

export type LibraryAnswerView = ReturnType<typeof useLibraryAnswer>
