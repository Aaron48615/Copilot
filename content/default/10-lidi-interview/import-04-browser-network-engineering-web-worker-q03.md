---
id: lidi-202609-import-04-browser-network-engineering-web-worker-q03
title: 什么时候用 requestAnimationFrame 而不是 Worker？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Web Worker, 主线程, postMessage, transferable]
---

# 什么时候用 requestAnimationFrame 而不是 Worker？

## 核心回答

动画和布局最终都要回主线程，Worker 不能直接替代渲染。Worker 适合重计算，requestAnimationFrame 适合把轻量的视觉更新对齐到下一帧，两者解决的问题不一样。

