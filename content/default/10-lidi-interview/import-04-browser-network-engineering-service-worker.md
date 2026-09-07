---
id: lidi-202609-import-04-browser-network-engineering-service-worker
title: Service Worker 能做什么，更新时有什么坑？
aliases: [PWA 缓存, service worker 生命周期, 离线缓存]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Service Worker, PWA, Cache API, 离线]
---

# Service Worker 能做什么，更新时有什么坑？

## 核心回答

Service Worker 是浏览器和页面之间的一层代理，可以拦截请求、做缓存策略、支持离线页面和后台能力。它有 install、waiting、activate 等生命周期，缓存不是简单写进去就完事，版本更新和旧缓存清理都要设计。

最容易出问题的是把 HTML、接口和静态资源用同一种缓存策略。带 hash 的 JS 可以长缓存，入口 HTML 通常需要及时验证；接口数据可能要网络优先或 stale-while-revalidate。策略写错后，用户会一直看到旧页面，甚至拿到旧接口数据。

