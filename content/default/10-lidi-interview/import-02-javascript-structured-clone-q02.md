---
id: lidi-202609-import-02-javascript-structured-clone-q02
title: Transferable 为什么会让原数据失效？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [structuredClone, 深拷贝, Transferable]
---

# Transferable 为什么会让原数据失效？

## 核心回答

转移的是底层资源所有权，不是再复制一份，所以发送后原 ArrayBuffer 会进入 detached 状态，不能继续读写。它适合大块二进制跨线程传递，减少复制成本；使用前要确保发送方确实不再需要这段内存。
