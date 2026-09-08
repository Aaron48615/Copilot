import { test, expect } from '@playwright/test'

async function snapshot(page: import('@playwright/test').Page) {
  return {
    body: await page.locator('.library-answer-body').textContent(),
    followups: await page.locator('.library-followups').textContent(),
    evidence: await page.getByRole('region', { name: '代码依据', exact: true }).textContent(),
    results: await page.locator('.question-list').textContent(),
    query: await page.getByRole('textbox', { name: '搜索题库' }).inputValue(),
    filter: await page.locator('#followup-search').inputValue(),
    selected: await page.locator('.followup-options button[aria-pressed="true"]').allTextContents(),
  }
}

for (const kind of ['embedded', 'linked']) {
  test(`${kind} answers, evidence, filters and selection stay identical across layouts`, async ({ page }) => {
    await page.goto('/')
    let requests = 0
    await page.route('**/api/**', async (route) => { requests++; await route.abort() })
    if (kind === 'linked') {
      await page.getByRole('button', { name: '切换用户，当前：牛' }).click()
      await page.locator('.user-option').filter({ hasText: 'Aaron' }).click()
    }
    await page.getByRole('button', { name: '暂停自动查找' }).click()
    const query = kind === 'embedded' ? '什么是闭包' : '为什么 AI Key 原来放 localStorage，后来又放到服务端？'
    await page.getByRole('textbox', { name: '搜索题库' }).fill(query)
    await page.locator('.question-row').first().click()
    await expect(page.locator('.followup-options button').first()).toBeVisible()
    const core = await snapshot(page)
    await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
    expect(await snapshot(page)).toEqual(core)
    await expect(page.locator('.wb-answer .answer-modes')).toHaveCount(0)
    await expect(page.locator('.wb-followups .answer-modes')).toBeVisible()
    await page.getByRole('button', { name: '返回普通布局' }).click()
    await page.locator('.followup-options button').last().click()
    await expect(page.getByRole('region', { name: '追问回答', exact: true })).toBeVisible()
    const followup = await snapshot(page)
    await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
    expect(await snapshot(page)).toEqual(followup)
    await page.locator('#followup-search').fill('不可能匹配的筛选词')
    const filtered = await snapshot(page)
    await page.getByRole('button', { name: '返回普通布局' }).click()
    expect(await snapshot(page)).toEqual(filtered)
    await page.getByRole('button', { name: '清空追问搜索' }).click()
    await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
    await page.locator('.followup-options button').first().click()
    const selectedInLandscape = await snapshot(page)
    await page.getByRole('button', { name: '返回普通布局' }).click()
    expect(await snapshot(page)).toEqual(selectedInLandscape)
    await page.getByRole('button', { name: '核心回答', exact: true }).click()
    expect(await snapshot(page)).toEqual(core)
    expect(requests).toBe(0)
  })
}

test('rotating the viewport preserves the selected answer', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: '搜索题库' }).fill('同一个工厂函数生成的两个计数器会共享状态吗？')
  await expect(page.getByRole('region', { name: '追问回答', exact: true })).toBeVisible()
  const before = await snapshot(page)
  await page.getByRole('button', { name: '横屏工作台', exact: true }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('dialog', { name: '旋转设备，继续复习' })).toBeVisible()
  await page.getByRole('button', { name: '关闭旋转设备，继续复习' }).click()
  expect(await snapshot(page)).toEqual(before)
})
