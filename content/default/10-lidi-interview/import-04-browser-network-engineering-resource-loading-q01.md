---
id: lidi-202609-import-04-browser-network-engineering-resource-loading-q01
title: defer 脚本的执行顺序可靠吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# defer 脚本的执行顺序可靠吗？

## 核心回答

同一文档里的 defer 脚本会在解析完成后按文档顺序执行，通常适合有依赖关系的主脚本。动态插入的 script 不一定遵循这套顺序，不能混在一起想当然。

