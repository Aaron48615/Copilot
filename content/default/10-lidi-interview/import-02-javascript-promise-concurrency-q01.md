---
id: lidi-202609-import-02-javascript-promise-concurrency-q01
title: 失败的任务怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise, 并发池, 队列, 限流, 请求]
---

# 失败的任务怎么处理？

## 核心回答

我会区分可重试和不可重试。网络抖动、临时的 502 可以按次数重试，并且每次延迟更久一点；参数错误、权限错误就直接失败，不应该无意义地重复请求。最后把成功、失败和重试次数都返回给调用方，页面才能告诉用户哪些已经完成。
