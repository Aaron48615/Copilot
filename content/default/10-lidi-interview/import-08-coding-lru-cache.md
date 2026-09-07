---
id: lidi-202609-import-08-coding-lru-cache
title: LRU 缓存怎么实现和验证？
aliases: [手写 LRU, 最近最少使用缓存]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LRU, 缓存, Map, 淘汰]
---

# LRU 缓存怎么实现和验证？

## 核心回答

JavaScript 的 Map 保持插入顺序，所以可以用 Map 做一个简单 LRU：get 命中后先删除再 set，让它变成最新；set 已有键也先删除；超过容量时删除 `map.keys().next().value`。容量要限制为正整数，未命中返回约定的空值。缓存还要另外考虑过期时间、读写并发和缓存穿透，LRU 只解决容量淘汰。

