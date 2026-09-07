---
id: lidi-202609-import-02-javascript-api-state-union
title: 如何用联合类型表达请求状态和错误？
aliases: [请求状态联合, API 状态类型, discriminated union API]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, loading, error, success, 联合类型]
---

# 如何用联合类型表达请求状态和错误？

## 核心回答

我会用带 `status` 的可辨识联合表达 `idle`、`loading`、`success` 和 `error`，让每个分支只拥有自己能访问的字段：success 有 data，error 有 message 和可选 code。这样 UI 的 switch 在漏掉新状态时能通过 `never` 提醒，而不是四个布尔值组合出 loading 且 success 的矛盾状态。网络错误、业务错误和字段解析错误也可以分别建模，页面再决定如何呈现。
