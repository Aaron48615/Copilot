---
id: lidi-202609-import-04-browser-network-engineering-service-worker-q02
title: 怎么避免缓存无限增长？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Service Worker, PWA, Cache API, 离线]
---

# 怎么避免缓存无限增长？

## 核心回答

在 activate 阶段删除旧版本缓存，并给运行时缓存设置数量或时间上限。缓存 key 里如果带用户数据，要考虑用户切换和退出登录，不能把私人响应无条件缓存给下一个用户。

