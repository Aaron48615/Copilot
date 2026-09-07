---
id: lidi-202609-import-03-frameworks-vue-async-component-q03
title: 缓存列表页会不会拿到旧数据？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [异步组件, keep-alive, defineAsyncComponent, 缓存]
---

# 缓存列表页会不会拿到旧数据？

## 核心回答

会，所以 activated 时要按业务决定检查时间戳、重新请求或清空缓存。缓存的是组件状态，不等于服务端数据永远新鲜。

