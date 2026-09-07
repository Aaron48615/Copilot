import { useEffect, useRef, useState } from 'react'
import { encodeWav, SpeechSegmenter } from './voice-audio'

interface VoiceCallbacks {
  onText: (text: string, final: boolean) => void
  onSpeechStart: () => void
}
export function useVoiceSearch(callbacks: VoiceCallbacks) {
  const callbacksRef = useRef(callbacks)
  callbacksRef.current = callbacks
  const [status, setStatus] = useState<'idle' | 'starting' | 'listening' | 'transcribing'>('idle')
  const [error, setError] = useState('')
  const [latency, setLatency] = useState<number | null>(null)
  const generation = useRef(0)
  const utterance = useRef(0)
  const resources = useRef<{ stream: MediaStream; context: AudioContext; node?: AudioWorkletNode; source?: MediaStreamAudioSourceNode; segmenter?: SpeechSegmenter } | null>(null)
  const request = useRef<AbortController | null>(null)
  const statusRef = useRef(status)
  statusRef.current = status

  function release() {
    generation.current++
    request.current?.abort(); request.current = null
    const current = resources.current
    resources.current = null
    if (current) {
      current.stream.getTracks().forEach((track) => track.stop())
      if (current.node) { current.node.port.onmessage = null; current.node.disconnect() }
      current.source?.disconnect()
      void current.context.close().catch(() => {})
    }
  }
  function stop() { release(); setStatus('idle') }
  useEffect(() => () => release(), [])

  async function transcribe(chunks: Float32Array[], final: boolean, session: number, phrase: number, sampleRate: number) {
    if (!final && request.current) return
    request.current?.abort()
    const controller = new AbortController()
    request.current = controller
    setStatus('transcribing')
    const started = performance.now()
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST', headers: { 'Content-Type': 'audio/wav' },
        body: encodeWav(chunks, sampleRate), signal: controller.signal,
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || `语音识别失败（${response.status}）`)
      if (controller.signal.aborted || session !== generation.current || phrase !== utterance.current) return
      const text = typeof data.text === 'string' ? data.text.trim() : ''
      if (text) {
        setLatency(Math.round(performance.now() - started))
        callbacksRef.current.onText(text, final)
      }
    } catch (failure) {
      if (controller.signal.aborted || session !== generation.current || phrase !== utterance.current) return
      setError(failure instanceof Error ? failure.message : '语音识别失败，请重试。')
      // Do not repeatedly submit paid requests after a configuration/network failure.
      stop()
    } finally {
      if (request.current === controller) {
        request.current = null
        if (session === generation.current) setStatus(resources.current ? 'listening' : 'idle')
      }
    }
  }

  async function start() {
    if (statusRef.current !== 'idle' || resources.current) return
    release()
    const session = generation.current
    statusRef.current = 'starting'
    setStatus('starting'); setError(''); setLatency(null)
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('麦克风需要 HTTPS 或 localhost，请使用安全地址打开。')
      // Surface missing backend/key before requesting microphone permission.
      const config = new AbortController()
      request.current = config
      const health = await fetch('/api/health', { signal: config.signal })
      const info = await health.json().catch(() => ({}))
      if (!health.ok || !info.configured) throw new Error(info.error || '请先在服务端 .env.local 中配置 OPENROUTER_API_KEY，并启动 API 服务。')
      if (session !== generation.current) return
      request.current = null
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: false, noiseSuppression: true, autoGainControl: true } })
      if (session !== generation.current) { stream.getTracks().forEach((track) => track.stop()); return }
      let context: AudioContext
      try { context = new AudioContext() }
      catch (error) { stream.getTracks().forEach((track) => track.stop()); throw error }
      const current = { stream, context } as NonNullable<typeof resources.current>
      resources.current = current
      await context.audioWorklet.addModule('/voice-processor.js')
      if (session !== generation.current) return
      const node = new AudioWorkletNode(context, 'voice-processor')
      const source = context.createMediaStreamSource(stream)
      const segmenter = new SpeechSegmenter(context.sampleRate)
      Object.assign(current, { node, source, segmenter })
      node.port.onmessage = (event: MessageEvent<Float32Array>) => {
        if (session !== generation.current) return
        const result = segmenter.push(event.data)
        if (result.started) {
          utterance.current++
          request.current?.abort(); request.current = null
          callbacksRef.current.onSpeechStart()
          setStatus('listening')
        }
        if (result.limited) {
          // A bounded clip must not be discarded by the start of another segment.
          node.port.onmessage = null; node.disconnect(); source.disconnect()
          stream.getTracks().forEach((track) => { track.onended = null; track.stop() })
          void context.close().catch(() => {})
          resources.current = null
          setError('连续收音已达 30 秒，已自动提交并暂停。需要继续时请再次开始聆听。')
        }
        if (result.audio) void transcribe(result.audio, !!result.final, session, utterance.current, context.sampleRate)
      }
      for (const track of stream.getAudioTracks()) track.onended = () => {
        if (session === generation.current) { setError('麦克风已断开，请重新开始聆听。'); stop() }
      }
      // Processor outputs silence: connecting it keeps capture running without feedback.
      source.connect(node); node.connect(context.destination)
      await context.resume()
      if (session !== generation.current) return
      if (context.state !== 'running') throw new Error('音频设备尚未就绪，请再次点击开始聆听。')
      setStatus('listening')
    } catch (failure) {
      if (session !== generation.current) return
      setError(failure instanceof DOMException && failure.name === 'NotAllowedError'
        ? '麦克风权限被拒绝，请在浏览器的网站权限中允许麦克风。'
        : failure instanceof Error ? failure.message : '无法开启麦克风。')
      stop()
    }
  }
  function submit() {
    const current = resources.current
    const audio = current?.segmenter?.flush()
    if (audio && current) void transcribe(audio, true, generation.current, utterance.current, current.context.sampleRate)
  }
  return { status, error, latency, start, stop, submit }
}
