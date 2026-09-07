---
id: lidi-202609-import-04-browser-network-engineering-source-map-build-q02
title: 为什么不把完整 source map 放公网？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [source map, 构建, 缓存, lockfile, CI]
---

# 为什么不把完整 source map 放公网？

## 核心回答

它可能还原业务代码、注释和内部目录，给攻击者更多信息。生产环境可以关闭公开 map，或只上传 hidden source map 到监控服务；调试权限和保留期限也要控制。发生线上问题时宁可通过受限平台还原堆栈，也不要用公开文件换方便。

