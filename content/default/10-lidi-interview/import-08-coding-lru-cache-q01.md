---
id: lidi-202609-import-08-coding-lru-cache-q01
title: 为什么不直接用对象？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LRU, 缓存, Map, 淘汰]
---

# 为什么不直接用对象？

## 核心回答

对象不适合表达任意键的插入顺序，也容易遇到原型键和属性语义问题。Map 的 `has`、`get`、`delete` 和顺序都是明确的，代码更短。若要支持持久化或跨进程共享，则需要换成专门的缓存系统，不能把内存 LRU 当成分布式缓存。

