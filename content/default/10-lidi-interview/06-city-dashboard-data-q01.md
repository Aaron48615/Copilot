---
id: lidi-202609-city-dashboard-data-q01
title: 为什么这里可以使用 Promise.all？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [React, Redux Toolkit, ECharts, Promise.all, 仪表盘, CSV]
---

# 为什么这里可以使用 Promise.all？

## 核心回答

1. 因为概览、事件、设施和交通排行之间没有严格的先后依赖，可以同时请求。
2. 并行请求能减少总等待时间。串行请求的总时间大致是每个请求时间相加，并行请求更接近最慢的那个请求。
3. `Promise.all` 的特点是其中一个 Promise reject 时整体 reject，所以适合“全部数据到齐后才展示完整页面”的场景。
4. 如果业务允许某个模块失败但其他模块继续展示，就可以考虑 `Promise.allSettled`，或者对每个模块单独处理错误。

