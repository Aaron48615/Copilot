---
id: lidi-202609-import-03-frameworks-react-render-performance-q02
title: 大列表怎么优化？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React 性能, rerender, memo, Profiler]
---

# 大列表怎么优化？

## 核心回答

只渲染视口附近的项目，也就是虚拟列表；减少每行的计算和图片尺寸变化；分页或增量加载数据。先确认瓶颈是 DOM 数量还是数据处理，别盲目把所有列表都虚拟化。

