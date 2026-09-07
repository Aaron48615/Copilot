---
id: lidi-202609-import-04-browser-network-engineering-tree-shaking-q02
title: 动态 import 一定能减小首屏吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tree-shaking, ESM, sideEffects, 循环依赖]
---

# 动态 import 一定能减小首屏吗？

## 核心回答

只有被拆出的模块不在首屏执行，且入口确实按需触发，才会减少初始传输和解析。预加载、共享依赖、缓存和用户很快就会打开的页面也会影响实际收益。优化前后要比较首屏资源、脚本执行和 LCP/INP，不能只看 chunk 数量。

