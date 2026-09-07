---
id: lidi-202609-import-02-javascript-structured-clone-q01
title: 和 JSON 深拷贝相比好在哪里？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [structuredClone, 深拷贝, Transferable]
---

# 和 JSON 深拷贝相比好在哪里？

## 核心回答

它不会把 undefined、NaN、Date 或循环引用粗暴变成字符串、null 或直接报错，类型覆盖更明确，也可以跨 worker 传结构化数据。代价是仍然要遍历整个对象图，而且函数、资源句柄等仍不能复制。只改一小块状态时，结构共享的浅复制通常更省。
