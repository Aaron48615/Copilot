---
id: lidi-202609-import-02-javascript-map-vs-foreach-q01
title: forEach 里写 async，外面会等它完成吗？
aliases: []
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [map, forEach, 返回值, 遍历, break]
---

# forEach 里写 async，外面会等它完成吗？

## 核心回答

不会。forEach 不会等待回调返回的 Promise。需要并行等待时，可以用 map 生成 Promise 数组再交给 Promise.all；需要按顺序执行时，可以用 for...of 配合 await。
