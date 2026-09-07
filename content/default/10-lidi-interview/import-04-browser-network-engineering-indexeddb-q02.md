---
id: lidi-202609-import-04-browser-network-engineering-indexeddb-q02
title: IndexedDB 失败时怎么办？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [localStorage, IndexedDB, Cache Storage, 存储]
---

# IndexedDB 失败时怎么办？

## 核心回答

我会把它当成可选缓存，而不是唯一真相。初始化失败、用户清理存储或浏览器不支持时，页面仍然走网络请求；写入失败要记录可观测信息，但不能让主流程一直卡住。离线队列还要有版本号、幂等键和冲突处理，重新联网时按顺序重放。

