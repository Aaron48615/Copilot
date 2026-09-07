---
id: lidi-202609-import-08-coding-lru-cache-q02
title: 如何测试淘汰顺序？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LRU, 缓存, Map, 淘汰]
---

# 如何测试淘汰顺序？

## 核心回答

先放入 A、B、C，读取 A，再写入 D，断言 B 被淘汰而 A、C 仍在。还要测覆盖同一键不会增加数量、容量为一、空缓存和过期后重新加载。性能测试可以观察大量 get/set 是否保持近似 O(1)。

