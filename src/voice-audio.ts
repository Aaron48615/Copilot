// Encode real PCM samples as mono WAV; never relabel a browser's WebM/MP4 blob.
export function encodeWav(chunks: Float32Array[], sampleRate: number): ArrayBuffer {
  const inputLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const input = new Float32Array(inputLength)
  let cursor = 0
  for (const chunk of chunks) { input.set(chunk, cursor); cursor += chunk.length }
  const outputRate = Math.min(sampleRate, 16000)
  const ratio = sampleRate / outputRate
  const length = Math.floor(inputLength / ratio)
  const buffer = new ArrayBuffer(44 + length * 2)
  const view = new DataView(buffer)
  const write = (offset: number, value: string) => [...value].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)))
  write(0, 'RIFF'); view.setUint32(4, 36 + length * 2, true); write(8, 'WAVE')
  write(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true)
  view.setUint16(22, 1, true); view.setUint32(24, outputRate, true)
  view.setUint32(28, outputRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true)
  write(36, 'data'); view.setUint32(40, length * 2, true)
  let offset = 44
  for (let index = 0; index < length; index++) {
    const start = Math.floor(index * ratio), end = Math.min(inputLength, Math.floor((index + 1) * ratio))
    let sample = 0
    for (let i = start; i < end; i++) sample += input[i]
    sample /= Math.max(1, end - start)
    const clipped = Math.max(-1, Math.min(1, sample))
    view.setInt16(offset, Math.round(clipped * (clipped < 0 ? 32768 : 32767)), true)
    offset += 2
  }
  return buffer
}

export class SpeechSegmenter {
  private chunks: Float32Array[] = []
  private lead: Float32Array[] = []
  private duration = 0
  private silence = 0
  private voiced = 0
  private lastPreview = 0
  private announced = false
  private sampleRate: number
  private threshold: number
  constructor(sampleRate: number, threshold = 0.012) { this.sampleRate = sampleRate; this.threshold = threshold }
  push(chunk: Float32Array): { started?: boolean; audio?: Float32Array[]; final?: boolean; limited?: boolean } {
    const ms = chunk.length / this.sampleRate * 1000
    const rms = Math.sqrt(chunk.reduce((sum, n) => sum + n * n, 0) / chunk.length)
    const speaking = rms >= this.threshold
    let started = false
    if (!this.chunks.length) {
      this.lead.push(chunk)
      // Keep about 200 ms before speech, including quiet initial consonants.
      while (this.lead.length > 1 && this.lead.reduce((n, c) => n + c.length, 0) > this.sampleRate * 0.2) this.lead.shift()
      if (!speaking) return {}
      this.chunks = this.lead.splice(0)
    } else this.chunks.push(chunk)
    this.duration += ms
    this.silence = speaking ? 0 : this.silence + ms
    if (speaking) this.voiced += ms
    if (!this.announced && this.voiced >= 220) { started = true; this.announced = true }
    if (this.silence >= 550 || this.duration >= 30000) {
      const audio = this.voiced >= 220 ? this.chunks : undefined
      const limited = this.duration >= 30000
      this.reset()
      return { started, audio, final: true, limited }
    }
    if (this.duration - this.lastPreview >= 2500 && this.voiced >= 220) {
      this.lastPreview = this.duration
      return { started, audio: [...this.chunks], final: false }
    }
    return { started }
  }
  flush() {
    const audio = this.voiced >= 220 ? this.chunks : undefined
    this.reset()
    return audio
  }
  private reset() {
    this.chunks = []; this.lead = []; this.duration = 0; this.silence = 0; this.voiced = 0; this.lastPreview = 0; this.announced = false
  }
}
