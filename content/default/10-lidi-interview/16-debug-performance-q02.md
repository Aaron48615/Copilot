---
id: lidi-202609-debug-performance-q02
title: 你会如何优化首屏性能？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Console, Sources, Network, Performance, Lighthouse, 兼容性, 首屏]
---

# 你会如何优化首屏性能？

## 核心回答

1. 先用 Network 和 Lighthouse 找到真实瓶颈，不根据感觉随便改。
2. 对不在首屏的页面使用路由懒加载，减少第一次下载的 JavaScript 体积。
3. 对图片选择合适尺寸和格式，非首屏图片可以懒加载；对第三方地图、3D 和图表库尽量按需要加载。
4. 合并或并行请求要根据业务决定。能并行的请求使用 `Promise.all`，有依赖的请求保持正确顺序。
5. 对长列表、复杂图表和频繁更新区域，减少不必要的计算和渲染，并在组件离开时清理资源。

