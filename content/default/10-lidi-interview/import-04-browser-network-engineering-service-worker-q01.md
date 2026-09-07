---
id: lidi-202609-import-04-browser-network-engineering-service-worker-q01
title: 新 Service Worker 为什么不立即生效？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Service Worker, PWA, Cache API, 离线]
---

# 新 Service Worker 为什么不立即生效？

## 核心回答

旧页面仍在使用旧 worker，新 worker 会先 waiting，等旧页面都关闭后再接管。可以根据产品需要设计 skipWaiting 和 clientsClaim，但强行接管可能让同一页面的资源版本不一致，要谨慎。

