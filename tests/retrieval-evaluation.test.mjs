import test from 'node:test'
import assert from 'node:assert/strict'
import { loadBanks } from '../server/api.mjs'
import { answerCandidates, searchCandidates, reliableAnswerMatch } from '../src/query-search.ts'
const bank = (await loadBanks(new URL('../', import.meta.url).pathname))[0]
const index = answerCandidates(bank.questions)
const cases = [
  ['什么是闭包', /闭包/],
  ['函数都执行完了，为啥里面那个变量还在？', /闭包/],
  ['闭包是什么，怎么排查它造成的内存泄漏？', /闭包|内存/],
  ['同一个工厂函数生成的两个计数器会共享状态吗？', /闭包/],
  ['事件循环', /Event Loop|事件循环/],
  ['Promise.all 和 allSettled 的区别', /Promise/],
  ['防抖和节流', /防抖|节流/],
  ['React 状态为什么更新后还是旧值', /React|旧值|闭包/],
  ['Vue 的响应式怎么实现', /响应式/],
  ['原型链是什么', /原型链/],
  ['箭头函数和普通函数区别', /函数|this/],
  ['跨域怎么处理', /跨域/],
  ['浏览器缓存策略', /缓存/],
  ['TypeScript 泛型', /泛型/],
  ['Flex 布局', /Flex|布局|居中/],
  ['Grid 布局', /Grid/],
  ['CSS 层叠上下文', /z-index|层叠/],
  ['图片懒加载', /图片|懒加载/],
  ['前端怎么防止 XSS', /XSS/],
  ['轻购购物车连续点加号，多个接口乱序返回怎么处理？', /购物车/],
  ['城市视图的路由权限和菜单权限是怎么配合的？', /权限/],
  ['图表容器尺寸变了，ECharts 怎么跟着变化？', /ECharts|图表/],
  ['两个项目的请求错误处理有什么区别？', /错误|请求/],
  ['缓存', /缓存/],
]
for (const [query, expected] of cases) test(`候选召回评测：${query}`, () => {
  const matches = searchCandidates(index, query).slice(0, 16)
  assert.ok(matches.some((item) => expected.test(item.question.title)), `前16项未召回主题 ${expected}`)
})
test('compound questions and broad project terms never short-circuit semantic verification', () => {
  for (const query of ['闭包是什么，怎么排查它造成的内存泄漏？', '缓存', '权限', '两个项目的请求错误处理有什么区别？']) assert.equal(reliableAnswerMatch(searchCandidates(index, query), query), undefined)
})
