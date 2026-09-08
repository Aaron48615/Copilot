import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { repositoryUsers } from './content'
import { getSidebarCategory, getSidebarCategoryLabel, getSidebarSections, matchesSidebarCategory, searchQuestions } from './question-bank'
import type { RepositoryUser } from './question-bank'
import { LEGACY_STORAGE_KEY, loadProfiles, PROFILE_STORAGE_KEY } from './profiles'
import type { ProfileStore } from './profiles'
import { getTextMatchRanges } from './search-text'
import type { InterviewQuestion } from './types'
import { useLibraryAnswer } from './LibraryAnswer'
import { renderText } from './TextContent'
import { Workbench, WorkbenchDialog, useLandscapeViewport } from './Workbench'
import { useSmartSearch } from './useSmartSearch'
import { cleanQuery, searchCandidates, answerCandidates } from './query-search'
import type { AnswerMetadata, LibraryMatch, CandidateResponse } from './answer-stream'
import { readAnswer } from './answer-stream'

function highlightText(text: string, query: string): ReactNode {
  const ranges = getTextMatchRanges(text, query)
  if (!ranges.length) return text

  const parts: ReactNode[] = []
  let cursor = 0
  ranges.forEach(([start, end], index) => {
    if (cursor < start) parts.push(text.slice(cursor, start))
    parts.push(<mark className="search-highlight" key={`${start}-${end}-${index}`}>{text.slice(start, end)}</mark>)
    cursor = end
  })
  if (cursor < text.length) parts.push(text.slice(cursor))
  return parts
}

const LEGACY_NOTICE_DISMISSED_KEY = 'interview-legacy-notice-dismissed'

function App() {
  const [workbench, setWorkbench] = useState(false)
  const [serviceProblem, setServiceProblem] = useState('')
  useEffect(() => {
    let controller: AbortController | undefined
    const check = async () => {
      controller?.abort()
      const request = new AbortController()
      controller = request
      const timer = window.setTimeout(() => request.abort(), 5000)
      try {
        const response = await fetch('/api/health', { signal: request.signal })
        if (!response.ok) throw new Error('unavailable')
        const status = await response.json()
        if (controller === request && !request.signal.aborted) setServiceProblem(status.semantic?.status === 'ready' ? '' : status.semantic?.status === 'loading' ? '本地语义索引准备中，关键词检索可用。首次准备完成后，后续查题无需等待大模型。' : '本地语义服务暂不可用，关键词检索可用。')
      } catch {
        if (controller === request) setServiceProblem('本地检索服务未连接，当前可使用关键词检索。')
      } finally { window.clearTimeout(timer) }
    }
    void check()
    const interval = window.setInterval(check, 10000)
    window.addEventListener('focus', check)
    return () => { window.clearInterval(interval); controller?.abort(); controller = undefined; window.removeEventListener('focus', check) }
  }, [])
  const landscapeReady = useLandscapeViewport()
  const [store, setStore] = useState(() => {
    try { return loadProfiles(localStorage, repositoryUsers.map((user) => user.id)) }
    catch { return { activeUserId: repositoryUsers[0].id, favorites: {} } as ProfileStore }
  })
  const [legacyBackup] = useState(() => {
    try { return localStorage.getItem(LEGACY_STORAGE_KEY) || '' }
    catch { return '' }
  })
  const [legacyNoticeDismissed, setLegacyNoticeDismissed] = useState(() => {
    try { return localStorage.getItem(LEGACY_NOTICE_DISMISSED_KEY) === 'true' }
    catch { return false }
  })
  function dismissLegacyNotice() {
    setLegacyNoticeDismissed(true)
    try { localStorage.setItem(LEGACY_NOTICE_DISMISSED_KEY, 'true') }
    catch { /* 存储不可用时仍允许关闭本次会话的提示，不删除旧数据。 */ }
  }
  const [error, setError] = useState('')
  const user = repositoryUsers.find((item) => item.id === store.activeUserId) || repositoryUsers[0]
  function save(next: ProfileStore) {
    setStore(next)
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next))
      setError('')
    } catch {
      setError('本次选择或收藏仅在当前页面有效：浏览器存储不可用。已发布题库仍可正常浏览。')
    }
  }
  function exportLegacy() {
    const url = URL.createObjectURL(new Blob([legacyBackup], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'interview-local-backup.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  function switchUser(id: string) {
    if (!repositoryUsers.some((item) => item.id === id)) return
    save({ ...store, activeUserId: id })
  }
  return <div className={workbench ? "application application-workbench" : "application"}>
    {serviceProblem && <div className="storage-error" role="status">{serviceProblem}</div>}
    {error && <div className="storage-error" role="alert">{error}</div>}
    {legacyBackup && !legacyNoticeDismissed && <div className="legacy-notice">
      <span>检测到旧版本地数据，尚未自动加入仓库。请导出备份后按 README 迁移题目；原数据仍保留在此浏览器。</span>
      <div className="legacy-notice-actions">
        <button onClick={exportLegacy}>导出旧数据</button>
        <button onClick={dismissLegacyNotice} title="关闭提示，保留旧数据备份">不再提示</button>
      </div>
    </div>}
    <UserWorkspace exportLegacy={legacyBackup ? exportLegacy : undefined} key={user.id} workbench={workbench && landscapeReady} requestWorkbench={() => setWorkbench(true)} exitWorkbench={() => setWorkbench(false)} user={user} favorites={Array.isArray(store.favorites[user.id]) ? store.favorites[user.id] : []}
      switchUser={switchUser}
      updateFavorites={(favorites) => save({ ...store, favorites: { ...store.favorites, [user.id]: favorites } })}
    />
    {workbench && !landscapeReady && <WorkbenchDialog title="旋转设备，继续复习" className="wb-rotation" close={() => setWorkbench(false)}>
      <p>横屏工作台需要横向视口，且至少为 667 × 360。请旋转设备或增大窗口，满足条件后会自动进入。</p>
      <p>当前题目和追问会保留。</p><button onClick={() => setWorkbench(false)}>取消，返回普通布局</button>
    </WorkbenchDialog>}
  </div>
}

function UserWorkspace({ user, favorites, switchUser, updateFavorites, workbench, requestWorkbench, exitWorkbench, exportLegacy }: {
  exportLegacy?: () => void
  workbench: boolean
  requestWorkbench: () => void
  exitWorkbench: () => void
  user: RepositoryUser
  favorites: string[]
  switchUser: (id: string) => void
  updateFavorites: (favorites: string[]) => void
}) {
  const questions = user.questions
  const sidebarSections = useMemo(() => getSidebarSections(questions), [questions])
  const hasCurrentInterview = questions.some((question) => question.category === 'current-interview')
  const defaultCategory = hasCurrentInterview ? 'current:all' : 'previous:all'
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLButtonElement>(null)
  const agentRequest = useRef<AbortController | null>(null)
  useEffect(() => () => agentRequest.current?.abort(), [])
  useEffect(() => {
    if (!menuOpen) return
    menuRef.current?.querySelector<HTMLButtonElement>('.user-option')?.focus()
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); avatarRef.current?.focus() }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const [activeAnswer, setActiveAnswer] = useState({ questionId: '', key: '' })
  const [query, setQuery] = useState('')
  const [agentQuestion, setAgentQuestion] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [category, setCategory] = useState(defaultCategory)
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '')
  const confirmedId = useRef<string | undefined>(undefined)
  const [metadata, setMetadata] = useState<AnswerMetadata>({ sources: [], projects: [] })
  const [agentState, setAgentState] = useState<'idle' | 'loading' | 'done' | 'error' | 'stopped'>('idle')
  const [agentAnswer, setAgentAnswer] = useState('')
  const [matchedQuestion, setMatchedQuestion] = useState('')
  const [suggestions, setSuggestions] = useState<CandidateResponse | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // 同标题题目在「这次面试」导入批次与旧题库并存，搜索只看当前选中的分类，避免跨库重复命中。
  const scopedQuestions = useMemo(() => questions.filter((question) => matchesSidebarCategory(question, category)), [questions, category])
  const searchIndex = useMemo(() => answerCandidates(scopedQuestions), [scopedQuestions])

  const results = useMemo(() => {
    if (!deferredQuery.trim()) return searchQuestions(scopedQuestions, '')
    const seen = new Set<string>()
    const candidates = searchCandidates(searchIndex, deferredQuery).filter(({ question }) => {
      if (seen.has(question.id)) return false
      seen.add(question.id); return true
    })
    if (matchedQuestion === deferredQuery) {
      const matched = questions.find((question) => question.id === selectedId)
      if (matched && !seen.has(matched.id)) candidates.unshift({ question: matched, score: 0 })
      candidates.sort((a, b) => Number(b.question.id === selectedId) - Number(a.question.id === selectedId))
    }
    return candidates
  }, [questions, scopedQuestions, deferredQuery, searchIndex, matchedQuestion, selectedId])
  const searchPending = query !== deferredQuery
  const selected = questions.find((question) => question.id === selectedId)
  const smart = useSmartSearch((text) => {
    if (!cleanQuery(text) || /^[a-z][a-z0-9_-]*$/i.test(text.trim())) return
    void askAgent(text, confirmedId.current)
  }, () => { agentRequest.current?.abort(); setAgentState('idle'); setMatchedQuestion(''); setSuggestions(null); setMetadata({ sources: [], projects: [] }) }, query)

  function selectMatch(match: LibraryMatch) {
    if (!questions.some((question) => question.id === match.questionId)) throw new Error('返回题目不属于当前用户。')
    setSuggestions(null)
    confirmedId.current = match.questionId
    setSelectedId(match.questionId)
    setActiveAnswer({ questionId: match.questionId, key: match.followupIndex === undefined ? '' : `embedded:${match.followupIndex}` })
    setAgentState('idle')
  }
  function editQuery(text: string) { smart.edit(); setQuery(text) }

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]
    updateFavorites(next)
  }

  async function askAgent(questionText = query, contextQuestionId = confirmedId.current, generate = false) {
    if (!questionText.trim()) return
    agentRequest.current?.abort()
    const controller = new AbortController()
    agentRequest.current = controller
    setSuggestions(null); setAgentState('loading'); setAgentAnswer(''); setAgentQuestion(questionText); setMetadata({ sources: [], projects: [] })
    try {
      const endpoint = generate ? '/api/answer' : '/api/resolve'
      const response = await fetch(endpoint, {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText, userId: user.id, userName: user.name, contextQuestionId }),
      })
      let matched = false
      await readAnswer(response, (text) => {
        if (!controller.signal.aborted && agentRequest.current === controller) setAgentAnswer(text)
      }, (data) => {
        if (!controller.signal.aborted && agentRequest.current === controller) setMetadata(data)
      }, (match) => {
        if (!controller.signal.aborted && agentRequest.current === controller) { matched = true; selectMatch(match); setMatchedQuestion(questionText) }
      }, (data) => {
        if (!controller.signal.aborted && agentRequest.current === controller) { matched = true; setSuggestions(data); setAgentState('idle') }
      })
      if (!matched && !controller.signal.aborted && agentRequest.current === controller) setAgentState('done')
    } catch (error) {
      if (controller.signal.aborted || agentRequest.current !== controller) return
      setAgentAnswer((partial) => `${partial ? partial + '\n\n' : ''}${error instanceof Error ? error.message : 'Agent 请求失败'}`)
      setAgentState('error')
    }
  }

  const library = useLibraryAnswer(selected, questions,
    activeAnswer.questionId === selected?.id ? activeAnswer.key : '',
    (key) => { smart.stop(); setActiveAnswer({ questionId: selected?.id || '', key }) })

  const evidence = <div className="source-evidence">
    {metadata.projects.map((project) => <p key={project.id}>{project.name}：{project.error || `已索引 ${project.files} 个文件${project.skipped ? `，跳过 ${project.skipped} 项` : ''}`}</p>)}
    {metadata.sources.length > 0 ? <><p>检索到的源码片段；回答中的 [S编号] 表示模型引用。</p>{metadata.sources.map((source) => <details key={source.id}>
      <summary>[{source.id}] {source.project} · {source.path}:{source.start}–{source.end}</summary>
      <small>索引版本 {source.revision}</small><pre>{source.text}</pre>
    </details>)}</> : <p>本次没有检索到源码依据。</p>}
  </div>
  const aiAnswer = suggestions ? <div className="agent-result agent-primary"><h2>{agentQuestion}</h2><p>{suggestions.reason}</p>{suggestions.candidates.map((match) => <button className="question-row" key={`${match.questionId}:${match.followupIndex}`} onClick={() => { smart.stop(); selectMatch(match) }}>{match.title || questions.find((q) => q.id === match.questionId)?.title}</button>)}<button className="secondary-button" onClick={() => { smart.stop(); void askAgent(agentQuestion, confirmedId.current, true) }}>这些都不符合，生成补充回答</button></div> : agentState === 'idle' ? undefined : <div className={`agent-result agent-primary ${agentState}`} aria-busy={agentState === 'loading'}>
    <span>查题 · {agentState === 'loading' ? '正在检索 / 生成' : agentState === 'error' ? '请求失败' : agentState === 'stopped' ? '已停止 · 内容可能不完整' : '已完成'}</span>
    <h2>{agentQuestion}</h2>
    <div className="agent-text">{agentAnswer ? renderText(agentAnswer) : <p role="status">正在查找相近回答，没有合适答案时再生成补充…</p>}</div>
    {!workbench && evidence}
    <div className="agent-actions">
      {agentState === 'loading' && <button onClick={() => { agentRequest.current?.abort(); setAgentState('stopped') }}>取消</button>}
      {agentState === 'error' && <button onClick={() => void askAgent(agentQuestion, confirmedId.current)}>重试查题</button>}
      <button onClick={() => { agentRequest.current?.abort(); setAgentState('idle') }}>返回题库答案</button>
    </div>
  </div>

  const categoryNavigation = (<>
    <nav className="category-nav" aria-label="题目分类">
      {sidebarSections.map((section) => (
        <section className={`nav-section nav-section-${section.id}`} key={section.id}>
          <p className="nav-section-title">{section.label}</p>
          {section.categories.map((item) => (
            <button className={category === item.id ? 'active' : ''} key={item.id} onClick={() => { smart.stop(); setCategory(item.id) }}>
              <span>{item.label}</span><em>{item.count}</em>
            </button>
          ))}
        </section>
      ))}
    </nav>
  </>)
  const userSwitcher = repositoryUsers.length === 1 && !exportLegacy ? null : (<>
    <div className="user-switcher" ref={menuRef}>
      <button ref={avatarRef} className="avatar" title={`当前用户：${user.name}，点击切换用户`}
        aria-label={`切换用户，当前：${user.name}`} aria-expanded={menuOpen} aria-controls="user-menu"
        onClick={() => setMenuOpen(!menuOpen)}>{Array.from(user.name)[0]}</button>
      {menuOpen && <div className="user-menu" id="user-menu" aria-label="用户切换">
        <p className="user-menu-title">切换用户<span>题库随网站发布 · 收藏仅限本机</span></p>
        <div className="user-options">
          {repositoryUsers.map((item) => <button className={`user-option ${item.id === user.id ? 'active' : ''}`} key={item.id}
            aria-pressed={item.id === user.id} onClick={() => { switchUser(item.id); setMenuOpen(false) }}>
            <span className="user-initial">{Array.from(item.name)[0]}</span>
            <span className="user-detail"><strong>{item.name}</strong><small>{item.questions.length} 道题</small></span>
            {item.id === user.id && <span className="user-check">✓</span>}
          </button>)}
        </div>
        <p className="repository-note">用户和题库由仓库统一维护，发布后在各浏览器中可见。</p>
        {exportLegacy && <button className="user-option" onClick={exportLegacy}>导出旧数据备份</button>}
      </div>}
    </div>
  </>)
  const searchBox = (<div className="search-tools">
    <div className={`search-wrap ${searchPending ? 'is-searching' : ''}`} aria-busy={searchPending}>
      <span className="search-icon">⌕</span>
      <input
        ref={searchRef}
        value={query}
        maxLength={2000}
        onChange={(event) => editQuery(event.target.value)}
        onCompositionStart={smart.compositionStart}
        onCompositionEnd={(event) => { smart.compositionEnd(); setQuery(event.currentTarget.value) }}
        onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); smart.submit() } }}
        aria-label="搜索题库"
        placeholder="输入面试官的完整问题，查找意思最接近的回答…"
        autoFocus
      />
      {query && <button aria-label="清空搜索" className="clear-search" onClick={() => editQuery('')}>×</button>}
      <kbd>⌘ K</kbd>
    </div>
  </div>)
  const questionResults = (<>
    <div className="result-heading">
      <span>{deferredQuery ? `找到 ${results.length} 个相关回答` : `${user.name} 的题库 · ${results.length} 道题`}</span>
      {deferredQuery && <small>{searchPending ? '正在更新…' : matchedQuestion === query ? '已匹配相近回答' : suggestions ? '相近题目待选择' : agentState === 'loading' ? '正在检索 / 生成' : '关键词候选'}</small>}
    </div>

    <div className="question-list">
      {!questions.length && <div className="empty-bank">
        <span className="empty-bank-mark">题</span>
        <h2>{user.name} 的题库，等你填满</h2>
        <p>这位用户还没有发布题目。<br />维护者添加题目并更新网站后，即可在这里复习。</p>
      </div>}
      {!!questions.length && !deferredQuery && !results.length && <p className="import-message">当前分类暂无题目。</p>}
      {results.map(({ question }) => (
        <button
          key={`${user.id}:${question.id}`}
          className={`question-row ${selected?.id === question.id ? 'selected' : ''}`}
          onClick={() => { smart.stop(); selectMatch({ questionId: question.id, followupIndex: query ? searchCandidates(searchIndex, query).find((item) => item.question.id === question.id)?.followupIndex : undefined }) }}
        >
          <span className="question-copy">
            <strong>{highlightText(question.title, deferredQuery)}</strong>
            <small>
              {highlightText(question.category === 'current-interview' ? getSidebarCategoryLabel(getSidebarCategory(question)) : question.categoryLabel, deferredQuery)}
              {[...new Set([...question.projects, ...question.keywords])].slice(0, 3).map((item) => <span key={item}> · {highlightText(item, deferredQuery)}</span>)}
            </small>
          </span>
          {deferredQuery && <span className="match-score">相关</span>}
          <span className="row-arrow">›</span>
        </button>
      ))}



    </div>
  </>)
  if (workbench) return <Workbench evidenceOverride={aiAnswer ? evidence : undefined} answerQuestion={agentQuestion} answerOverride={aiAnswer} question={selected}
    library={library}
    categories={categoryNavigation} categoryLabel={getSidebarCategoryLabel(category)}
    search={searchBox} userMenu={userSwitcher} results={questionResults}
    favorite={!!selected && favorites.includes(selected.id)} toggleFavorite={toggleFavorite} exit={exitWorkbench} />

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">答</span>
          <div><strong>面试话术库</strong><small>Interview Copilot</small></div>
        </div>

        {categoryNavigation}

        <div className="sidebar-note">
          <span className="status-dot" />
          <div><strong>{questions.length} 道已整理</strong><small>{user.name} 的独立题库</small></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">FRONTEND INTERVIEW</span>
            <h1>你现在想复习什么？</h1>
          </div>
          <div className="topbar-actions"><button className="workbench-entry" aria-pressed={false} onClick={requestWorkbench}>横屏工作台</button>{userSwitcher}</div>
        </header>

        {searchBox}

        <p className="bank-origin">已发布题库 · 各浏览器均可访问</p>
        {questionResults}
      </main>

      <aside className="answer-panel">
        {aiAnswer || (selected ? <div className="answer-reader">
          <div className="answer-intro">
            <div className="answer-header">
              <div className="answer-meta"><span>{selected.categoryLabel}</span><span>{selected.difficulty}</span></div>
              <button aria-label={favorites.includes(selected.id) ? '取消收藏' : '收藏题目'} className={favorites.includes(selected.id) ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(selected.id)}>{favorites.includes(selected.id) ? '★' : '☆'}</button>
            </div>
            <h2>{highlightText(selected.title, deferredQuery)}</h2>
            {library.modes}
          </div>
          <div className="answer-scroll">
            {library.body}
            {library.followups}
            <section className="answer-card" aria-label="代码依据"><div className="section-title"><strong>代码依据</strong></div>{library.evidence}</section>
          </div>
        </div> : <div className="empty-answer"><span>⌕</span><p>选择一道题查看口语回答</p></div>)}
      </aside>
    </div>
  )
}


export default App
