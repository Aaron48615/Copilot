---
id: lidi-202609-import-04-browser-network-engineering-service-worker-q03
title: 为什么开发环境有时关掉缓存还不行？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Service Worker, PWA, Cache API, 离线]
---

# 为什么开发环境有时关掉缓存还不行？

## 核心回答

Service Worker 本身仍可能拦截请求。需要在 Application 面板注销 worker、清理 Cache Storage，并确认页面确实重新注册了新版本。只按普通浏览器缓存处理，定位会绕远路。

