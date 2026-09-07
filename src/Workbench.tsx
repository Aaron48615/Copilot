import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { InterviewQuestion } from './types'
import { getAnswerContent, getPendingFollowups, resolveFollowups } from './answers'
import { renderEvidence, renderText } from './TextContent'

export function useLandscapeViewport() {
  const read = () => window.matchMedia('(orientation: landscape)').matches && window.innerWidth >= 667 && window.innerHeight >= 360
  const [ready, setReady] = useState(read)
  useEffect(() => {
    const update = () => setReady(read())
    const orientation = window.matchMedia('(orientation: landscape)')
    window.addEventListener('resize', update)
    orientation.addEventListener('change', update)
    return () => { window.removeEventListener('resize', update); orientation.removeEventListener('change', update) }
  }, [])
  return ready
}

// Native dialogs make the background inert; explicit Tab wrapping also keeps focus out of browser chrome.
export function WorkbenchDialog({ title, className = '', close, children }: {
  title: string; className?: string; close: () => void; children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const dialog = ref.current!
    dialog.showModal()
    return () => { dialog.close(); if (opener?.isConnected) opener.focus() }
  }, [])
  return <dialog ref={ref} className={`wb-dialog ${className}`} aria-label={title}
    onKeyDown={(event) => {
      if (event.key !== 'Tab') return
      const targets = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input, [tabindex="0"]')]
        .filter((element) => element.getClientRects().length)
      const first = targets[0], last = targets[targets.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}
    onCancel={(event) => { event.preventDefault(); close() }}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
    }}>
    <header><strong>{title}</strong><button autoFocus onClick={close} aria-label={`关闭${title}`}>关闭 ×</button></header>
    <div className="wb-dialog-scroll" tabIndex={0}>{children}</div>
  </dialog>
}

export function Workbench({ question, questions, activeKey, setActiveKey, categories, categoryLabel, search, userMenu, results, favorite, toggleFavorite, exit }: {
  question?: InterviewQuestion; questions: InterviewQuestion[]
  activeKey: string; setActiveKey: (key: string) => void
  categories: ReactNode; categoryLabel: string; search: ReactNode; userMenu: ReactNode; results: ReactNode
  favorite: boolean; toggleFavorite: (id: string) => void; exit: () => void
}) {
  const [drawer, setDrawer] = useState<'categories' | null>(null)
  const evidenceRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const content = question ? getAnswerContent(question) : null
  const followups = question ? resolveFollowups(question, questions) : []
  const active = followups.find((item) => item.key === activeKey)
  const evidence = active ? active.evidence : content?.evidence
  const pending = getPendingFollowups(content?.prompts, followups)
  useEffect(() => {
    answerRef.current?.scrollTo({ top: 0 })
    evidenceRef.current?.scrollTo({ top: 0 })
  }, [question?.id, activeKey])
  useEffect(() => { setDrawer(null) }, [question?.id])
  return <main className="workbench" aria-label="横屏工作台">
    <div className="wb-context">
      <section className="wb-card wb-question">
        <button className="wb-exit" onClick={exit}>← 返回普通布局</button>
        <div className="wb-scroll" tabIndex={0} aria-label="当前主问题">
          <span className="wb-label">当前主问题 · {question?.categoryLabel || '待选择'}</span>
          <h1>{question?.title || '选择一道题开始复习'}</h1>
        </div>
        {question && <button className="wb-favorite" aria-pressed={favorite} onClick={() => toggleFavorite(question.id)}>{favorite ? '★ 已收藏' : '☆ 收藏题目'}</button>}
      </section>
      <section className={`wb-card wb-answer ${active ? 'is-followup' : ''}`} aria-label={active ? '追问回答' : '核心回答'}>
        <div ref={answerRef} className="wb-scroll wb-answer-body" tabIndex={0}>
          {renderText(active?.answer || content?.core || '暂无核心回答，请选择其他题目。')}
        </div>
        {active && <footer className="wb-answer-footer">
          <h2 tabIndex={0}>{active.title}</h2>
          <button onClick={() => setActiveKey('')}>返回核心回答</button>
        </footer>}
      </section>
      <section className="wb-card wb-evidence" aria-label="代码依据">
        <span className="wb-label">代码依据</span>
        <div ref={evidenceRef} className="wb-scroll wb-evidence-text" tabIndex={0}>
          {evidence ? renderEvidence(evidence) : <p className="wb-empty">暂无代码依据</p>}
        </div>
      </section>
    </div>
    <div className="wb-operations">
      <aside className="wb-card wb-categories"><div className="wb-full-categories">{categories}</div>
        <button className="wb-category-trigger" onClick={() => setDrawer('categories')} aria-label="展开题库分类"><span>题库 ☰</span><span>{categoryLabel}</span></button>
      </aside>
      <section className="wb-card wb-browser" aria-label="题目快查">
        <div className="wb-search-row">{search}{userMenu}</div>
        <div className="wb-scroll wb-results" tabIndex={0}>{results}</div>
      </section>
      <aside className="wb-card wb-followups" aria-label="可能追问">
        <header><strong>可能追问</strong><span>{followups.length} 道已整理</span></header>
        <div className="wb-scroll" tabIndex={0}>
          <p className="wb-label">已整理追问</p>
          {followups.length ? followups.map((item, index) => <button key={item.key} aria-pressed={activeKey === item.key} onClick={() => setActiveKey(item.key)}>
            <span className="wb-number">{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span>
          </button>) : <p className="wb-empty">本题暂无已整理追问</p>}
          {!!pending.length && <><p className="wb-label wb-pending-label">待整理</p>{pending.map((title) => <div className="wb-pending" key={title}><p>{title}</p><small>暂无已整理答案</small></div>)}</>}
        </div>
      </aside>
    </div>
    {drawer === 'categories' && <WorkbenchDialog title="题库分类" className="wb-category-drawer" close={() => setDrawer(null)}><div onClick={(event) => { if ((event.target as HTMLElement).closest('button')) setDrawer(null) }}>{categories}</div></WorkbenchDialog>}
  </main>
}
