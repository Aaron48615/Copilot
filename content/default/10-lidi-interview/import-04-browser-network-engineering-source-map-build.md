---
id: lidi-202609-import-04-browser-network-engineering-source-map-build
title: source map、构建缓存和可复现构建怎么做？
aliases: [source map, 可复现构建, 构建缓存]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [source map, 构建, 缓存, lockfile, CI]
---

# source map、构建缓存和可复现构建怎么做？

## 核心回答

source map 让压缩后的堆栈回到源码，但生产 map 可能暴露源码和路径，我会把它上传到受限的错误平台，不把公开 URL 放到静态站点。可复现构建依赖锁文件、固定 Node 和包管理器版本、明确环境变量，CI 用干净环境构建并校验产物。缓存可以复用依赖和中间产物，但 cache key 必须包含 lockfile、构建配置和运行时版本，避免拿旧产物冒充新版本。

