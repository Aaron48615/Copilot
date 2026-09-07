---
id: lidi-202609-import-08-coding-concurrency-pool
title: 如何实现一个带并发上限的 Promise 池？
aliases: [并发池, Promise 并发限制, concurrency limit]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [并发池, 限流, Promise, worker]
---

# 如何实现一个带并发上限的 Promise 池？

## 核心回答

我会维护下一个任务下标和正在运行的数量，启动不超过 limit 个 worker；每个 worker 完成后取下一个任务，直到队列耗尽。结果按原始下标保存，这样完成先后不会改变返回顺序。还要决定遇到一个错误是立即停止，还是收集所有结果；如果支持取消，就让 worker 在取新任务前检查 signal。

