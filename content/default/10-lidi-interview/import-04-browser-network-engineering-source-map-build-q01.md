---
id: lidi-202609-import-04-browser-network-engineering-source-map-build-q01
title: 构建缓存失效怎么排查？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [source map, 构建, 缓存, lockfile, CI]
---

# 构建缓存失效怎么排查？

## 核心回答

先比较依赖锁文件、Node、插件版本和构建参数，再看缓存 key 是否真的变化；删除缓存做一次基线构建，比较产物 hash 和日志。缓存命中不能作为正确性的证据，发布前仍要在干净环境跑测试和 smoke。错误平台若无法映射堆栈，也要保留发布版本和 commit 关联。

