---
id: lidi-202609-import-04-browser-network-engineering-resource-loading-q03
title: 模块脚本默认是什么行为？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# 模块脚本默认是什么行为？

## 核心回答

module 脚本默认具有 defer 的解析行为，并且会按模块依赖加载。动态 import 可以把非首屏代码延后，但也要处理网络失败和版本更新后的 chunk 不存在。

