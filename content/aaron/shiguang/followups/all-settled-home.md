---
id: shiguang-followup-all-settled-home
title: 追问：首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await？
aliases: [能讲讲项目中的首页选择 allSettled 的原因吗？, 关于首页选择 allSettled 的原因，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, Promise.allSettled, 并行请求, 业务校验]
---

# 追问：首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await？

## 核心回答

首页的轮播、公告和推荐商品互相不依赖，没必要请求一个再 await 一个。我用 `Promise.allSettled` 一起收集结果，再分别判断，让公告失败时，轮播和商品还能显示。`Promise.all` 也能并行，但一项拒绝就进入失败分支。

拿到结果后还要检查 `success` 和数组结构，不能 Promise 成功就当业务成功，正常空数组也不算错误。

【目前等三组都结束才更新，重试也是一起重试。要先返回先展示，或者只重试失败区域，还得把各区域的 loading 和重试状态拆开。】

## 回答要点

- 首页的轮播、公告和推荐商品互相不依赖，没必要请求一个再 await 一个。
- 拿到结果后还要检查 `success` 和数组结构，不能 Promise 成功就当业务成功，正常空数组也不算错误。
- 目前等三组都结束才更新，重试也是一起重试。要先返回先展示，或者只重试失败区域，还得把各区域的 loading 和重试状态拆开。

## 面试官可能追问

- 某一区域先返回时能否立刻显示，当前限制在哪？
- 接口正常返回空数组应该作为失败处理吗？

## 代码证据

> **代码依据（不用于口述）**
> - [homeData.ts 第 13～41 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:13)：并行结算、业务状态和数组结构检查。
> - [首页第 5～8 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:5)：失败区域和重试入口。
> - [首页第 185～205 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:185)：统一赋值和 loading 收尾。
> - [首页测试第 25～53 行](/Users/aaron/personal-hub/apps/project-2/tests/home-data.test.ts:25)：已有异常与空数组场景；本轮未执行。
> - 原理参考：[MDN Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)。
