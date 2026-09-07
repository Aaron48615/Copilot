---
id: lidi-202609-import-02-javascript-promise-concurrency-q02
title: 怎么支持取消？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise, 并发池, 队列, 限流, 请求]
---

# 怎么支持取消？

## 核心回答

队列本身要有 cancelled 状态。还没开始的任务直接从队列跳过，已经开始的请求用 AbortController 取消；worker 在取任务和请求返回后都检查一次取消标记。取消是用户主动放弃，不应该被页面当成普通错误提示。
