---
id: lidi-202609-import-02-javascript-promise-concurrency
title: 前端请求并发太多时怎么控制？
aliases: [并发请求限制, Promise 并发池, 请求队列怎么写]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise, 并发池, 队列, 限流, 请求]
---

# 前端请求并发太多时怎么控制？

## 核心回答

我会先把任务放进队列，再限制同时运行的数量。比如有一百张图片要上传，不会一次性 `Promise.all` 全发出去，而是规定最多同时跑三个或五个；一个任务结束，就从队列里补下一个。这样既不会一下子把浏览器连接和服务端压满，失败时也更容易重试。

实现上可以维护一个下标和正在运行的数量，启动固定数量的 worker。每个 worker 不断取下一个任务，成功或失败都要进入 finally，保证队列能继续往下走。要是任务之间有依赖，就不能只看并发数，还得按依赖关系分批。
