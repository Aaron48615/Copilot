---
id: lidi-202609-import-04-browser-network-engineering-cache-details
title: ETag、Last-Modified 和 stale-while-revalidate 怎么配合？
aliases: [HTTP 缓存细节, ETag, stale-while-revalidate]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Cache-Control, ETag, Last-Modified, CDN, 缓存]
---

# ETag、Last-Modified 和 stale-while-revalidate 怎么配合？

## 核心回答

强缓存命中时浏览器直接用本地内容，不发请求；需要验证时会带 ETag 或 Last-Modified，服务端确认没变就返回 304，变了才传新内容。`stale-while-revalidate` 允许先给一份稍旧的缓存，同时后台验证更新，适合能容忍短暂旧数据的读接口。HTML、带 hash 的静态资源和用户私有数据的缓存策略不同，不能只看“缓存越久越快”。

