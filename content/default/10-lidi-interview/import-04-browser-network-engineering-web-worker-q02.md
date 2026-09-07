---
id: lidi-202609-import-04-browser-network-engineering-web-worker-q02
title: SharedWorker 和普通 Worker 有什么区别？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Web Worker, 主线程, postMessage, transferable]
---

# SharedWorker 和普通 Worker 有什么区别？

## 核心回答

普通 Worker 一般服务一个页面上下文，SharedWorker 可以被同源的多个页面共享，通过端口通信。共享状态更复杂，生命周期和关闭时机也更难管理，只有确实需要跨页面协作时才考虑。

