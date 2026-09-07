---
id: lidi-202609-import-04-browser-network-engineering-web-worker-q01
title: Worker 怎么取消？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Web Worker, 主线程, postMessage, transferable]
---

# Worker 怎么取消？

## 核心回答

简单场景可以调用 terminate 直接结束，再创建新的 Worker。任务型 Worker 也可以约定取消消息，让它自己停止；如果任务已经在执行，页面还要丢弃迟到的结果，不能只依赖终止时序。

