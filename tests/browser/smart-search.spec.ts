import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toBeVisible()
})

test('stable pasted input automatically resolves and displays evidence in both layouts', async ({ page }) => {
  let calls = 0
  await page.route('**/api/resolve', async (route) => {
    calls++
    expect(route.request().postDataJSON().question).toBe('测试一个没有现成答案的复杂问题')
    await route.fulfill({ contentType: 'text/event-stream', body: 'data: {"sources":[{"id":"S1","project":"轻购","path":"src/cart.ts","start":1,"end":2,"text":"const count = 1","revision":"abc"}],"projects":[]}\n\ndata: {"choices":[{"delta":{"content":"根据源码回答 [S1]"}}]}\n\ndata: [DONE]\n\n' })
  })
  await page.getByRole('textbox', { name: '搜索题库' }).fill('测试一个没有现成答案的复杂问题')
  await expect(page.getByText('根据源码回答 [S1]', { exact: true })).toBeVisible()
  await expect(page.getByText('[S1] 轻购 · src/cart.ts:1–2', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
  await expect(page.getByRole('region', { name: '代码依据' }).getByText('[S1] 轻购 · src/cart.ts:1–2', { exact: true })).toBeVisible()
  expect(calls).toBe(1)
})

test('IME composition and candidate selection never submit unfinished text', async ({ page }) => {
  let calls = 0
  await page.route('**/api/resolve', async (route) => { calls++; await route.fulfill({ json: { answer: '确认后的结果' } }) })
  const input = page.getByRole('textbox', { name: '搜索题库' })
  await input.dispatchEvent('compositionstart')
  await input.fill('候选还未确认')
  await input.press('Enter')
  await page.waitForTimeout(1000)
  expect(calls).toBe(0)
  await input.dispatchEvent('compositionend')
  await expect(page.getByText('确认后的结果')).toBeVisible()
  expect(calls).toBe(1)
})

test('rapid edits debounce, pause cancels, and Enter submits manually', async ({ page }) => {
  const requests: string[] = []
  await page.route('**/api/resolve', async (route) => { requests.push(route.request().postDataJSON().question); await route.fulfill({ json: { answer: '新结果' } }) })
  const input = page.getByRole('textbox', { name: '搜索题库' })
  await input.fill('一个未完成问题')
  await input.fill('最终完整的测试问题')
  await expect(page.locator('.agent-text').getByText('新结果', { exact: true })).toBeVisible()
  expect(requests).toEqual(['最终完整的测试问题'])
  await input.fill('取消的问题')
  await page.getByRole('button', { name: '暂停自动查找' }).click()
  await page.waitForTimeout(1000)
  expect(requests).toHaveLength(1)
  await input.press('Enter')
  await expect.poll(() => requests.length).toBe(2)
})

test('local exact match needs no network and resolves inside the current category', async ({ page }) => {
  let requests = 0
  await page.route('**/api/resolve', async (route) => { requests++; await route.abort() })
  await page.getByRole('textbox', { name: '搜索题库' }).fill('！！！')
  await page.waitForTimeout(900)
  expect(requests).toBe(0)
  await page.getByRole('textbox', { name: '搜索题库' }).fill('原型链是什么')
  await page.waitForTimeout(1000)
  expect(requests).toBe(0)
  await expect(page.locator('.answer-reader h2').first()).toContainText('原型链是什么')
  await expect(page.locator('.question-row').first()).toBeVisible()
})

test('late old replies cannot overwrite a newer query or cleared input', async ({ page }) => {
  let started = false
  await page.route('**/api/resolve', async (route) => {
    const old = route.request().postDataJSON().question === '旧问题需要很久'
    if (old) { started = true; await new Promise((resolve) => setTimeout(resolve, 1500)) }
    await route.fulfill({ json: { answer: old ? '过期结果' : '最新结果' } }).catch(() => {})
  })
  const input = page.getByRole('textbox', { name: '搜索题库' })
  await input.fill('旧问题需要很久')
  await expect.poll(() => started).toBe(true)
  await input.fill('新的独立问题')
  await input.press('Enter')
  await expect(page.getByText('最新结果')).toBeVisible()
  await page.waitForTimeout(1700)
  await expect(page.getByText('过期结果')).toHaveCount(0)
  await input.fill('')
  await expect(page.getByText('最新结果')).toHaveCount(0)
})

test('clicking a candidate cancels scheduled automatic work', async ({ page }) => {
  let calls = 0
  await page.route('**/api/resolve', async (route) => { calls++; await route.abort() })
  await page.getByRole('textbox', { name: '搜索题库' }).fill('缓存')
  await page.locator('.question-row').first().click()
  await page.waitForTimeout(1000)
  expect(calls).toBe(0)
})

test('matched embedded followup opens its answer instead of the parent core', async ({ page }) => {
  await page.getByRole('textbox', { name: '搜索题库' }).fill('同一个工厂函数生成的两个计数器会共享状态吗？')
  await expect(page.getByRole('region', { name: '追问回答' })).toContainText('每调一次工厂就有一份新的')
})

test('switching users drops an in-flight response', async ({ page }) => {
  let started = false
  await page.route('**/api/resolve', async (route) => {
    started = true
    await new Promise((resolve) => setTimeout(resolve, 1200))
    await route.fulfill({ json: { answer: '原用户的独占答案' } }).catch(() => {})
  })
  await page.getByRole('textbox', { name: '搜索题库' }).fill('需要长时间生成的独占测试')
  await expect.poll(() => started).toBe(true)
  await page.getByRole('button', { name: '切换用户，当前：牛' }).click()
  await page.locator('.user-option').filter({ hasText: 'Aaron' }).click()
  await page.waitForTimeout(1400)
  await expect(page.getByText('原用户的独占答案')).toHaveCount(0)
  await expect(page.getByRole('textbox', { name: '搜索题库' })).toHaveValue('')
})
