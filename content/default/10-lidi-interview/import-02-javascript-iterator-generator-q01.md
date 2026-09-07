---
id: lidi-202609-import-02-javascript-iterator-generator-q01
title: 生成器和 async/await 是什么关系？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [迭代器, 生成器, Symbol.iterator, yield]
---

# 生成器和 async/await 是什么关系？

## 核心回答

async/await 可以看作把 Promise 异步流程写得更直观，早期也可以用生成器加执行器手动推进 Promise。现在业务代码通常直接用 async/await，生成器仍然适合做可暂停的同步迭代或特定流程控制。
