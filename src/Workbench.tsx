import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { InterviewQuestion } from './types'
import type { LibraryAnswerView } from './LibraryAnswer'

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

export function Workbench({ question, library, categories, categoryLabel, search, userMenu, results, favorite, toggleFavorite, exit, answerOverride, answerQuestion, evidenceOverride }: {
  answerQuestion?: string
  evidenceOverride?: ReactNode
  answerOverride?: ReactNode
  question?: InterviewQuestion
  library: LibraryAnswerView
  categories: ReactNode; categoryLabel: string; search: ReactNode; userMenu: ReactNode; results: ReactNode
  favorite: boolean; toggleFavorite: (id: string) => void; exit: () => void
}) {
  const [drawer, setDrawer] = useState<'categories' | null>(null)
  const evidenceRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    answerRef.current?.scrollTo({ top: 0 })
    evidenceRef.current?.scrollTo({ top: 0 })
  }, [question?.id, library.activeKey])
  useEffect(() => { setDrawer(null) }, [question?.id])
  return <main className="workbench" aria-label="横屏工作台">
    <div className="wb-context">
      <section className="wb-card wb-question">
        <button className="wb-exit" onClick={exit}>← 返回普通布局</button>
        <div className="wb-scroll" tabIndex={0} aria-label="当前主问题">
          <span className="wb-label">{answerOverride ? '当前输入问题 · AI 临时回答' : `当前主问题 · ${question?.categoryLabel || '待选择'} · ${question?.difficulty || ''}`}</span>
          <h1>{answerOverride ? answerQuestion : question?.title || '选择一道题开始复习'}</h1>
        </div>
        {question && !answerOverride && <button className="wb-favorite" aria-pressed={favorite} onClick={() => toggleFavorite(question.id)}>{favorite ? '★ 已收藏' : '☆ 收藏题目'}</button>}
      </section>
      <section className={`wb-card wb-answer ${library.activeKey ? 'is-followup' : ''}`} aria-label={answerOverride ? 'AI 临时回答' : library.activeKey ? '当前追问' : '核心回答'}>
        <div ref={answerRef} className="wb-scroll wb-answer-body" tabIndex={0}>
          {answerOverride || library.body}
        </div>
      </section>
      <section className="wb-card wb-evidence" aria-label="代码依据">
        <span className="wb-label">代码依据</span>
        <div ref={evidenceRef} className="wb-scroll wb-evidence-text" tabIndex={0}>
          {evidenceOverride || (!answerOverride ? library.evidence : <p className="wb-empty">暂无代码依据</p>)}
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
        <header><strong>可能追问</strong></header>
        {!answerOverride && library.modes}
        <div className="wb-scroll" tabIndex={0}>
          {answerOverride ? <p className="wb-empty">返回题库答案后可查看已整理追问。</p> : library.followups}
        </div>
      </aside>
    </div>
    {drawer === 'categories' && <WorkbenchDialog title="题库分类" className="wb-category-drawer" close={() => setDrawer(null)}><div onClick={(event) => { if ((event.target as HTMLElement).closest('button')) setDrawer(null) }}>{categories}</div></WorkbenchDialog>}
  </main>
}
