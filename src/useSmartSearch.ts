import { useEffect, useRef, useState } from 'react'

// Input edits invalidate both scheduled work and already-delivered asynchronous work.
export function useSmartSearch(run: (text: string) => void, cancel: () => void, query: string) {
  const [revision, setRevision] = useState(0)
  const composing = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const latest = useRef({ run, cancel, query })
  latest.current = { run, cancel, query }
  const handled = useRef('')
  function stop() {
    clearTimeout(timer.current)
    handled.current = latest.current.query
    latest.current.cancel()
  }
  function submit(text = latest.current.query) {
    clearTimeout(timer.current)
    if (composing.current || !/[\p{L}\p{N}]/u.test(text)) return
    handled.current = text
    latest.current.run(text)
  }
  function edit() {
    clearTimeout(timer.current)
    latest.current.cancel()
    handled.current = ''
    setRevision((value) => value + 1)
  }
  useEffect(() => {
    if (!composing.current && query !== handled.current && /[\p{L}\p{N}]/u.test(query)) {
      timer.current = setTimeout(() => submit(query), 800)
    }
    return () => clearTimeout(timer.current)
  }, [query, revision])
  return { stop, submit, edit,
    compositionStart: () => { composing.current = true; edit() },
    compositionEnd: () => { composing.current = false; edit() },
  }
}
