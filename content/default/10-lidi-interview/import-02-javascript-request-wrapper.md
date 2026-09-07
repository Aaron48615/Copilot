---
id: lidi-202609-import-02-javascript-request-wrapper
title: 如何设计一个带超时、重试和取消的请求函数？
aliases: [请求封装怎么写, fetch 超时重试, 可取消请求]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [fetch, AbortController, timeout, retry, 请求封装]
---

# 如何设计一个带超时、重试和取消的请求函数？

## 核心回答

我会把它拆成四件事：参数校验、超时控制、错误分类和取消入口。调用方传入 URL、请求选项和重试次数，函数内部创建 AbortController；超时就主动 abort，外面如果也传了 signal，就把两者的取消合并起来。

重试不能见错就重试。网络断开、请求超时和部分 5xx 可以考虑重试，4xx 参数错误通常不重试。每次重试加一点退避时间，最后把原始错误带出来。这样调用方拿到的是明确的成功、失败或取消，而不是一个永远卡着的请求。
