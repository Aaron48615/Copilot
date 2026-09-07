---
id: lidi-202609-import-04-browser-network-engineering-web-worker
title: Web Worker 适合解决什么问题？
aliases: [主线程卡顿, Web Worker, worker 通信]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Web Worker, 主线程, postMessage, transferable]
---

# Web Worker 适合解决什么问题？

## 核心回答

Worker 适合把比较重、又不需要直接操作 DOM 的计算移到后台线程，比如大文件解析、复杂数据转换、图像处理。页面通过 postMessage 传数据，Worker 做完再回消息。它不是把所有异步都丢过去，网络请求本身通常不需要 Worker。

通信会有序列化成本。大数组频繁复制也可能抵消收益，适合时可以用 transferable 转移 ArrayBuffer 的所有权。Worker 没有 DOM，不能直接更新页面，最终还是要把结果交回主线程。

