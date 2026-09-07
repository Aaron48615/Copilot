import { test, expect, type Page } from '@playwright/test'

async function setup(page: Page) {
  await page.addInitScript(() => {
    const state = { node: null as any, stops: 0 }
    ;(window as any).__mic = state
    const track = { stop() { state.stops++ }, onended: null }
    const stream = { getTracks: () => [track], getAudioTracks: () => [track] }
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { value: async () => stream })
    class MockContext {
      sampleRate = 16000
      state = 'running'
      destination = {}
      audioWorklet = { addModule: async () => {} }
      createMediaStreamSource() { return { connect() {}, disconnect() {} } }
      async resume() {}
      async close() {}
    }
    class MockNode {
      port = { onmessage: null }
      constructor() { state.node = this }
      connect() {}
      disconnect() {}
    }
    ;(window as any).AudioContext = MockContext
    ;(window as any).AudioWorkletNode = MockNode
  })
  await page.route('**/api/health', (route) => route.fulfill({ json: { configured: true } }))
  await page.goto('/')
}
async function speak(page: Page) {
  await page.getByRole('button', { name: '开始聆听' }).click()
  await expect(page.getByText('正在聆听 · 停顿后自动查找')).toBeVisible()
  await emit(page)
}
async function emit(page: Page, frames = 8, silence = 6) {
  await page.evaluate(({ frames, silence }) => {
    const node = (window as any).__mic.node
    for (let i = 0; i < frames; i++) node.port.onmessage?.({ data: new Float32Array(1600).fill(0.1) })
    for (let i = 0; i < silence; i++) node.port.onmessage?.({ data: new Float32Array(1600) })
  }, { frames, silence })
}

test('spoken question searches all categories, opens local answer, and does not call the model', async ({ page }) => {
  await setup(page)
  let answerCalls = 0
  await page.route('**/api/answer', (route) => { answerCalls++; return route.fulfill({ json: { answer: '不应调用' } }) })
  await page.route('**/api/transcribe', (route) => route.fulfill({ json: { text: '什么是闭包？' } }))
  await speak(page)
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('什么是闭包？')
  await expect(page.locator('.answer-panel')).toContainText('闭包')
  await expect(page.locator('.voice-transcript')).toContainText('搜索当前用户全部题库')
  expect(answerCalls).toBe(0)
  await page.getByRole('button', { name: '暂停聆听' }).click()
  expect(await page.evaluate(() => (window as any).__mic.stops)).toBeGreaterThan(0)
})

test('unknown question automatically streams an answer in normal and landscape layouts', async ({ page }) => {
  await setup(page)
  await page.route('**/api/transcribe', (route) => route.fulfill({ json: { text: '请解释量子纠错的阈值定理' } }))
  await page.route('**/api/answer', (route) => route.fulfill({ contentType: 'text/event-stream', body: 'data: {"choices":[{"delta":{"content":"这是自动生成的回答。"}}]}\n\ndata: [DONE]\n\n' }))
  await speak(page)
  await expect(page.locator('.answer-panel .agent-primary')).toContainText('这是自动生成的回答。')
  await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
  await expect(page.locator('.wb-answer .agent-primary')).toContainText('这是自动生成的回答。')
  await expect(page.getByRole('button', { name: '暂停聆听' })).toBeVisible()
  await page.setViewportSize({ width: 667, height: 360 })
  await expect(page.locator('.wb-answer .agent-primary')).toBeVisible()
  await expect(page.getByRole('button', { name: '暂停聆听' })).toBeInViewport()
  await expect(page.getByRole('button', { name: '立即查找' })).toBeInViewport()
  await page.screenshot({ path: 'test-results/voice-landscape.png' })
})

test('interim transcription only searches; final commits exactly one fallback request', async ({ page }) => {
  await setup(page)
  let answers = 0, transcriptions = 0
  await page.route('**/api/transcribe', (route) => { transcriptions++; return route.fulfill({ json: { text: '解释量子纠错阈值' } }) })
  await page.route('**/api/answer', (route) => { answers++; return route.fulfill({ json: { answer: '最终回答' } }) })
  await page.getByRole('button', { name: '开始聆听' }).click()
  await expect(page.getByText('正在聆听 · 停顿后自动查找')).toBeVisible()
  await emit(page, 26, 0)
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('解释量子纠错阈值')
  expect(answers).toBe(0)
  await emit(page, 0, 6)
  await expect(page.locator('.agent-primary')).toContainText('最终回答')
  expect(transcriptions).toBe(2); expect(answers).toBe(1)
})

test('manual input and switching users discard late transcription and release microphone', async ({ page }) => {
  await setup(page)
  let release!: () => void
  const gate = new Promise<void>((resolve) => { release = resolve })
  await page.route('**/api/transcribe', async (route) => { await gate; await route.fulfill({ json: { text: '过期的转写内容' } }).catch(() => {}) })
  await speak(page)
  await expect(page.getByText('正在识别，仍在收音…')).toBeVisible()
  await page.getByRole('textbox', { name: '搜索题库' }).fill('手动输入')
  release()
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('手动输入')
  await expect(page.getByRole('button', { name: '开始聆听' })).toBeVisible()
  await page.getByRole('button', { name: '开始聆听' }).click()
  await expect(page.getByText('正在聆听 · 停顿后自动查找')).toBeVisible()
  await page.getByRole('button', { name: '切换用户，当前：牛' }).click()
  await page.getByRole('button', { name: /Aaron.*337 道题/ }).click()
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('')
  await expect(page.getByRole('button', { name: '开始聆听' })).toBeVisible()
  expect(await page.evaluate(() => (window as any).__mic.stops)).toBeGreaterThanOrEqual(2)
})

test('missing key is actionable and does not activate the microphone', async ({ page }) => {
  await setup(page)
  await page.route('**/api/health', (route) => route.fulfill({ json: { configured: false } }))
  await page.getByRole('button', { name: '开始聆听' }).click()
  await expect(page.getByRole('alert')).toContainText('OPENROUTER_API_KEY')
  expect(await page.evaluate(() => (window as any).__mic.node)).toBeNull()
  await expect(page.getByRole('button', { name: '开始聆听' })).toBeVisible()
})

test('embedded followup opens its specific answer in both layouts', async ({ page }) => {
  await setup(page)
  await page.route('**/api/transcribe', (route) => route.fulfill({ json: { text: '同一个工厂函数生成的两个计数器会共享状态吗？' } }))
  await speak(page)
  await expect(page.locator('.followup-answer h3')).toHaveText('同一个工厂函数生成的两个计数器会共享状态吗？')
  await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
  await expect(page.locator('.wb-answer-footer h2')).toHaveText('同一个工厂函数生成的两个计数器会共享状态吗？')
})

test('a new spoken question cancels an old answer and rejects its late response', async ({ page }) => {
  await setup(page)
  let transcription = 0
  let release!: () => void
  const gate = new Promise<void>((resolve) => { release = resolve })
  await page.route('**/api/transcribe', (route) => route.fulfill({ json: { text: ++transcription === 1 ? '解释量子纠错阈值' : '什么是闭包？' } }))
  await page.route('**/api/answer', async (route) => { await gate; await route.fulfill({ json: { answer: '过期回答不可显示' } }).catch(() => {}) })
  await speak(page)
  await expect(page.locator('.agent-primary')).toContainText('正在生成')
  await emit(page)
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('什么是闭包？')
  release()
  await expect(page.locator('.answer-panel')).toContainText('闭包')
  await expect(page.locator('.agent-primary')).toHaveCount(0)
})

test('real AudioWorklet captures a synthetic audio stream and uploads a valid 16 kHz WAV', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { value: async () => {
      const context = new AudioContext()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const output = context.createMediaStreamDestination()
      oscillator.connect(gain); gain.connect(output)
      gain.gain.value = 0
      oscillator.start()
      await context.resume()
      ;(window as any).__syntheticAudio = { context, oscillator, gain }
      return output.stream
    } })
  })
  await page.route('**/api/health', (route) => route.fulfill({ json: { configured: true } }))
  let captured = false
  await page.route('**/api/transcribe', (route) => {
    const audio = route.request().postDataBuffer()!
    expect(audio.toString('ascii', 0, 4)).toBe('RIFF')
    expect(audio.readUInt32LE(24)).toBe(16000)
    expect(audio.byteLength).toBeGreaterThan(16000)
    captured = true
    return route.fulfill({ json: { text: '什么是闭包？' } })
  })
  await page.goto('/')
  await page.getByRole('button', { name: '开始聆听' }).click()
  await expect(page.getByText('正在聆听 · 停顿后自动查找')).toBeVisible()
  await page.evaluate(() => { const { gain } = (window as any).__syntheticAudio; gain.gain.value = 0.1; setTimeout(() => { gain.gain.value = 0 }, 1000) })
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('什么是闭包？', { timeout: 10000 })
  expect(captured).toBe(true)
  await page.getByRole('button', { name: '暂停聆听' }).click()
  await page.evaluate(() => { const audio = (window as any).__syntheticAudio; audio.oscillator.stop(); void audio.context.close() })
})
