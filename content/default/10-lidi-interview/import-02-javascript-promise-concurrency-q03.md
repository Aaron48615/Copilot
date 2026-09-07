---
id: lidi-202609-import-02-javascript-promise-concurrency-q03
title: 和 Promise.all 有什么关系？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise, 并发池, 队列, 限流, 请求]
---

# 和 Promise.all 有什么关系？

## 核心回答

`Promise.all` 只负责等待一组已经创建的 Promise，它不会替我限制创建数量，也不会自动取消其他请求。并发池是在创建任务之前控制节奏；如果只是三四个互相独立的请求，直接用 `Promise.all` 就够了，不必为了形式再包一层。
