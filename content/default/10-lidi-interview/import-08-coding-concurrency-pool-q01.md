---
id: lidi-202609-import-08-coding-concurrency-pool-q01
title: 并发上限为什么不能只用 Promise.all？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [并发池, 限流, Promise, worker]
---

# 并发上限为什么不能只用 Promise.all？

## 核心回答

Promise.all 会一次把所有任务都启动，文件上传、批量请求或浏览器连接数受限时可能造成内存和服务端压力。并发池把同时运行的数量控制在可接受范围，也能在任务完成后持续补位，吞吐和资源占用更平衡。

