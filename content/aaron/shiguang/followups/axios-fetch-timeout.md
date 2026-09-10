---
id: shiguang-followup-axios-fetch-timeout
title: 追问：商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别？
aliases: [能讲讲项目中的Axios 与 fetch 的使用和两层超时吗？, 关于Axios 与 fetch 的使用和两层超时，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, Axios, fetch, 超时]
---

# 追问：商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别？

## 核心回答

商城接口多，要统一处理地址、Token、响应和图片链接，所以用了 Axios。原来的 AI 联想和卖点是单独的同源请求，返回 `{ text, error }`，就用了 fetch 和 AbortController。新增选购助手也是 fetch，不过它会读取 response.body，逐步解析流式事件。

原来的联想和卖点接口，服务端等模型设了 12 秒，浏览器设了 15 秒，是想留一点时间，让服务端先把超时错误返回。浏览器的定时器在 finally 里清理，读取响应体的过程也在超时控制内。

【fetch 收到 404、500 不会自动 reject，要检查 `resp.ok`；`resp.json()` 也是异步的。练习版拿到 Response 就清计时器，可能管不到读取响应体时的卡住，改进版才放到 finally。12 秒和 15 秒是配置，不保证所有环境精确到点结束。AI 也不是必须用 fetch，接口多了可以单独建 Axios 实例。】

## 回答要点

- 商城接口多，要统一处理地址、Token、响应和图片链接，所以用了 Axios。
- 原来的联想和卖点接口，服务端等模型设了 12 秒，浏览器设了 15 秒，是想留一点时间，让服务端先把超时错误返回。
- fetch 收到 404、500 不会自动 reject，要检查 `resp.ok`；`resp.json()` 也是异步的。

## 面试官可能追问

- fetch 返回 500 时为什么仍需手动判断响应？
- 超时控制为什么要覆盖读取响应体的过程？

## 代码证据

> **代码依据（不用于口述）**
> - [商城 Axios 第 17～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:17)：商城公共配置、Token 和响应处理。
> - [改进版 AI 客户端第 7～46 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)：状态码检查、响应读取和 finally 清理计时器。
> - [AI 服务端第 188～192 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:188)：12 秒上游超时。
> - [练习版 AI 客户端第 44～80 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:44)：收到响应后提前清理计时器。
> - 原理参考：[MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)。
