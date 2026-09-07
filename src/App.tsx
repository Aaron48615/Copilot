import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { repositoryUsers } from './content'
import { getSidebarCategory, getSidebarCategoryLabel, getSidebarSections, matchesSidebarCategory, prepareQuestionSearch, searchQuestions } from './question-bank'
import type { RepositoryUser } from './question-bank'
import { LEGACY_STORAGE_KEY, loadProfiles, PROFILE_STORAGE_KEY } from './profiles'
import type { ProfileStore } from './profiles'
import { getTextMatchRanges } from './search-text'
import type { InterviewQuestion } from './types'
import { filterFollowups, getAnswerContent } from './answers'
import { renderText } from './TextContent'
import { Workbench, WorkbenchDialog, useLandscapeViewport } from './Workbench'
import { useVoiceSearch } from './useVoiceSearch'
import { cleanSpeech, reliableVoiceMatch, searchVoice, voiceCandidates } from './voice-search'
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
  const [voiceQuery, setVoiceQuery] = useState(false)
  const [agentQuestion, setAgentQuestion] = useState('')
  const voiceIndex = useMemo(() => voiceCandidates(questions), [questions])
  useEffect(() => {
    const warmup = window.setTimeout(() => prepareQuestionSearch(voiceIndex.map((item) => item.question)), 50)
    return () => window.clearTimeout(warmup)
  }, [voiceIndex])
  const deferredQuery = useDeferredValue(query)
  const [category, setCategory] = useState(defaultCategory)
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '')
  const voiceContextId = useRef(selectedId)
  const [agentState, setAgentState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [agentAnswer, setAgentAnswer] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const scopedQuestions = useMemo(
    () => voiceQuery ? questions : questions.filter((question) => matchesSidebarCategory(question, category)),
    [questions, category, voiceQuery],
  )
  const results = useMemo(() => {
    if (!voiceQuery) return searchQuestions(scopedQuestions, deferredQuery)
    const seen = new Set<string>()
    return searchVoice(voiceIndex, deferredQuery).filter(({ question }) => {
      if (seen.has(question.id)) return false
      seen.add(question.id); return true
    })
  }, [scopedQuestions, deferredQuery, voiceQuery, voiceIndex])
  const searchPending = query !== deferredQuery
  const selected = results.find(({ question }) => question.id === selectedId)?.question || results[0]?.question
  const hasReliableMatch = !deferredQuery.trim() || (voiceQuery
    ? !!reliableVoiceMatch(searchVoice(voiceIndex, deferredQuery), deferredQuery, selectedId)
    : (results[0]?.score ?? 0) >= 38)

  const voice = useVoiceSearch({
    onSpeechStart: () => { voiceContextId.current = selectedId; agentRequest.current?.abort(); setAgentState('idle') },
    onText: (text, final) => {
      setVoiceQuery(true); setQuery(text)
      if (!final || cleanSpeech(text).length < 2) return
      const matches = searchVoice(voiceIndex, text)
      const match = reliableVoiceMatch(matches, text, voiceContextId.current)
      if (match) {
        agentRequest.current?.abort(); setAgentState('idle')
        setSelectedId(match.question.id)
        setActiveAnswer({ questionId: match.question.id, key: match.followupIndex === undefined ? '' : `embedded:${match.followupIndex}` })
      } else {
        void askAgent(text, voiceContextId.current)
      }
    },
  })

  function editQuery(text: string) {
    voice.stop(); agentRequest.current?.abort(); setAgentState('idle')
    setVoiceQuery(false); setQuery(text)
  }

  useEffect(() => {
    if (!searchPending && results.length && !results.some(({ question }) => question.id === selectedId)) {
      setSelectedId(results[0].question.id)
    }
  }, [results, selectedId, searchPending])

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

  async function askAgent(questionText = query, contextQuestionId = selectedId) {
    if (!questionText.trim()) return
    agentRequest.current?.abort()
    const controller = new AbortController()
    agentRequest.current = controller
    setAgentState('loading'); setAgentAnswer(''); setAgentQuestion(questionText)
    try {
      const endpoint = import.meta.env.VITE_AGENT_ENDPOINT || '/api/answer'
      const response = await fetch(endpoint, {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText, userId: user.id, userName: user.name, contextQuestionId }),
      })
      await readAnswer(response, (text) => {
        if (!controller.signal.aborted && agentRequest.current === controller) setAgentAnswer(text)
      })
      if (!controller.signal.aborted && agentRequest.current === controller) setAgentState('done')
    } catch (error) {
      if (controller.signal.aborted || agentRequest.current !== controller) return
      setAgentAnswer(error instanceof Error ? error.message : 'Agent 请求失败')
      setAgentState('error')
    }
  }

  const aiAnswer = agentState === 'idle' ? undefined : <div className={`agent-result agent-primary ${agentState}`} aria-busy={agentState === 'loading'}>
    <span>AI 临时回答 · {agentState === 'loading' ? '正在生成' : agentState === 'error' ? '请求失败' : '已完成'}</span>
    <h2>{agentQuestion}</h2>
    <div className="agent-text">{agentAnswer ? renderText(agentAnswer) : <p role="status">题库没有可靠答案，正在生成回答…</p>}</div>
    <div className="agent-actions">
      {agentState === 'loading' && <button onClick={() => { agentRequest.current?.abort(); setAgentState(agentAnswer ? 'done' : 'idle') }}>停止生成</button>}
      {agentState === 'error' && <button onClick={() => void askAgent(agentQuestion)}>重试回答</button>}
      <button onClick={() => { agentRequest.current?.abort(); setAgentState('idle') }}>返回题库答案</button>
    </div>
  </div>

  const categoryNavigation = (<>
    <nav className="category-nav" aria-label="题目分类">
      {sidebarSections.map((section) => (
        <section className={`nav-section nav-section-${section.id}`} key={section.id}>
          <p className="nav-section-title">{section.label}</p>
          {section.categories.map((item) => (
            <button className={category === item.id ? 'active' : ''} key={item.id} onClick={() => { voice.stop(); agentRequest.current?.abort(); setAgentState('idle'); setVoiceQuery(false); setCategory(item.id) }}>
              <span>{item.label}</span><em>{item.count}</em>
            </button>
          ))}
        </section>
      ))}
    </nav>
  </>)
  const userSwitcher = (<>
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
        onChange={(event) => editQuery(event.target.value)}
        aria-label="搜索题库"
        placeholder="搜索知识点、项目难点或面试官的问法，中文或拼音都可以…"
        autoFocus
      />
      {query && <button aria-label="清空搜索" className="clear-search" onClick={() => editQuery('')}>×</button>}
      <kbd>⌘ K</kbd>
    </div>
    <div className="voice-toolbar">
      <button className={`voice-toggle ${voice.status !== 'idle' ? 'is-listening' : ''}`} aria-pressed={voice.status !== 'idle'} onClick={() => voice.status === 'idle' ? void voice.start() : voice.stop()}>
        <span aria-hidden="true">{voice.status === 'idle' ? '◉' : '■'}</span> {voice.status === 'idle' ? '开始聆听' : voice.status === 'starting' ? '取消开启' : '暂停聆听'}
      </button>
      <span className="voice-status" role="status">{voice.status === 'starting' ? '正在连接麦克风…' : voice.status === 'transcribing' ? '正在识别，仍在收音…' : voice.status === 'listening' ? '正在聆听 · 停顿后自动查找' : '麦克风收音 · 未命中自动问 AI'}</span>
      {(voice.status === 'listening' || voice.status === 'transcribing') && <button className="voice-submit" onClick={voice.submit}>立即查找</button>}
      {voice.latency !== null && <small className="voice-latency">转写 {(voice.latency / 1000).toFixed(1)} 秒</small>}
    </div>
    {voiceQuery && query && <p className="voice-transcript">识别：{query}<span>搜索当前用户全部题库{cleanSpeech(query) !== query ? ` · ${cleanSpeech(query)}` : ''}</span></p>}
    {voice.error && <p className="voice-error" role="alert">{voice.error}</p>}
  </div>)
  const questionResults = (<>
    <div className="result-heading">
      <span>{deferredQuery ? `找到 ${results.length} 个相关回答` : `${user.name} 的题库 · ${results.length} 道题`}</span>
      {deferredQuery && <small>{searchPending ? '正在更新…' : '按匹配程度排序'}</small>}
    </div>

    <div className="question-list">
      {!questions.length && <div className="empty-bank">
        <span className="empty-bank-mark">题</span>
        <h2>{user.name} 的题库，等你填满</h2>
        <p>这位用户还没有发布题目。<br />维护者添加题目并更新网站后，即可在这里复习。</p>
      </div>}
      {!!questions.length && !deferredQuery && !results.length && <p className="import-message">当前分类暂无题目。</p>}
      {results.map(({ question, score }) => (
        <button
          key={`${user.id}:${question.id}`}
          className={`question-row ${selected?.id === question.id ? 'selected' : ''}`}
          onClick={() => { voice.stop(); agentRequest.current?.abort(); setSelectedId(question.id); setActiveAnswer({ questionId: question.id, key: '' }); setAgentState('idle') }}
        >
          <span className="question-copy">
            <strong>{highlightText(question.title, deferredQuery)}</strong>
            <small>
              {highlightText(question.category === 'current-interview' ? getSidebarCategoryLabel(getSidebarCategory(question)) : question.categoryLabel, deferredQuery)}
              {[...new Set([...question.projects, ...question.keywords])].slice(0, 3).map((item) => <span key={item}> · {highlightText(item, deferredQuery)}</span>)}
            </small>
          </span>
          {deferredQuery && <span className="match-score">{Math.min(99, Math.round(score))}%</span>}
          <span className="row-arrow">›</span>
        </button>
      ))}

      {deferredQuery && !searchPending && !hasReliableMatch && (
        <div className="fallback-card">
          <div className="agent-orb">✦</div>
          <div><strong>题库里暂时没有可靠答案</strong><p>向已配置的 Agent 请求一次性回答，个性化内容取决于服务端配置。</p></div>
          <button onClick={() => void askAgent()} disabled={agentState === 'loading'}>{agentState === 'loading' ? '正在分析…' : '询问 Agent'}</button>
        </div>
      )}


    </div>
  </>)
  if (workbench) return <Workbench answerQuestion={agentQuestion} answerOverride={aiAnswer} question={selected} questions={questions}
    activeKey={activeAnswer.questionId === selected?.id ? activeAnswer.key : ''}
    setActiveKey={(key) => { voice.stop(); agentRequest.current?.abort(); setAgentState('idle'); setActiveAnswer({ questionId: selected?.id || '', key }) }}
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
        {aiAnswer || (selected ? <AnswerPanel initialFollowupIndex={activeAnswer.questionId === selected.id && activeAnswer.key.startsWith('embedded:') ? Number(activeAnswer.key.slice(9)) : undefined} key={`${user.id}:${selected.id}`} question={selected} query={deferredQuery} favorite={favorites.includes(selected.id)} toggleFavorite={toggleFavorite} /> : (
          <div className="empty-answer"><span>⌕</span><p>选择一道题查看口语回答</p></div>
        ))}
      </aside>
    </div>
  )
}

function AnswerPanel({ question, query, favorite, toggleFavorite, initialFollowupIndex }: {
  initialFollowupIndex?: number
  question: InterviewQuestion
  query: string
  favorite: boolean
  toggleFavorite: (id: string) => void
}) {
  const content = getAnswerContent(question)
  const [mode, setMode] = useState<'core' | 'followups'>('core')
  const [filter, setFilter] = useState('')
  const [activeTitle, setActiveTitle] = useState(content.followups[0]?.title || '')
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const followup = initialFollowupIndex === undefined ? undefined : content.followups[initialFollowupIndex]
    setMode(followup ? 'followups' : 'core')
    if (followup) { setFilter(''); setActiveTitle(followup.title) }
    scrollRef.current?.scrollTo({ top: 0 })
  }, [initialFollowupIndex, question.id])
  const matches = filterFollowups(content.followups, filter)
  const active = matches.find((item) => item.title === activeTitle) || matches[0]
  const hasExtras = content.followups.length > 0 || content.points || content.prompts || content.evidence

  function changeMode(next: 'core' | 'followups') {
    setMode(next)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  function openFollowup(title: string) {
    setActiveTitle(title)
    setFilter('')
    changeMode('followups')
  }

  return (
    <div className="answer-reader">
      <div className="answer-intro">
      <div className="answer-header">
        <div className="answer-meta"><span>{question.categoryLabel}</span><span>{question.difficulty}</span></div>
        <button aria-label={favorite ? '取消收藏' : '收藏题目'} className={favorite ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(question.id)}>{favorite ? '★' : '☆'}</button>
      </div>
      <h2>{highlightText(question.title, query)}</h2>
      {hasExtras && (
        <div className="answer-modes" role="group" aria-label="回答模式">
          <button aria-pressed={mode === 'core'} onClick={() => changeMode('core')}>核心回答</button>
          <button aria-pressed={mode === 'followups'} onClick={() => changeMode('followups')}>追问速查 <span>{content.followups.length || '补充'}</span></button>
        </div>
      )}
      </div>
      <div ref={scrollRef} className="answer-scroll">

      {mode === 'core' && <>
      {content.core && (
        <section className="answer-card core">
          <div className="section-title"><span className="quote-mark">“</span><strong>先这样回答</strong></div>
          <div className="answer-body">{renderText(content.core)}</div>
        </section>
      )}

      {content.otherSections.map(([name, text]) => (
        <section key={name} className="answer-card">
          <div className="section-title"><strong>{name}</strong></div>
          <div className="answer-body">{renderText(text)}</div>
        </section>
      ))}
      {content.followups.length > 0 && (
        <nav className="quick-followups" aria-label="本题追问入口">
          <div className="section-title"><strong>面试官接着问</strong><span>点问题，直接看回答</span></div>
          {content.followups.map((item) => <button key={item.title} onClick={() => openFollowup(item.title)}>{item.title}<span aria-hidden="true">↗</span></button>)}
        </nav>
      )}
      </>}

      {mode === 'followups' && <>
      {content.followups.length > 0 && <>
        <div className="followup-finder">
          <label htmlFor="followup-search">查本题追问</label>
          <div className="followup-search">
            <input id="followup-search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="输入关键词，如：并发、为什么、失败" />
            {filter && <button aria-label="清空追问搜索" onClick={() => setFilter('')}>×</button>}
          </div>
          <nav className="followup-options" aria-label="选择追问">
            {matches.map((item, index) => <button key={item.title} aria-pressed={active?.title === item.title} onClick={() => {
              setActiveTitle(item.title)
              scrollRef.current?.scrollTo({ top: 0 })
            }}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button>)}
          </nav>
        </div>
        {active ? <section key={active.title} className="answer-card followup-answer" aria-label="追问回答" tabIndex={0}>
          <div className="section-title"><strong>被问到这里，再这样说</strong></div>
          <h3>{active.title}</h3>
          <div className="answer-body">{renderText(active.answer)}</div>
        </section> : <div className="followup-empty" role="status"><p>本题没有匹配的追问，试试更短的关键词。</p><button onClick={() => setFilter('')}>查看全部追问</button></div>}
      </>}
      {content.points && (
        <details className="answer-notes"><summary>回答要点</summary><div>{renderText(content.points)}</div></details>
      )}
      {content.prompts && (
        <details className="answer-notes"><summary>其他待准备的追问</summary><div>{renderText(content.prompts)}</div></details>
      )}
      {content.evidence && <details className="answer-notes"><summary>代码参考</summary><div className="evidence">{renderText(content.evidence)}</div></details>}
      </>}
      </div>
    </div>
  )
}

export default App
