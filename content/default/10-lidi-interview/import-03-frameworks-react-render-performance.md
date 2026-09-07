---
id: lidi-202609-import-03-frameworks-react-render-performance
title: React 页面更新慢时怎么定位？
aliases: [React 性能优化, 重复渲染, memo useMemo]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React 性能, rerender, memo, Profiler]
---

# React 页面更新慢时怎么定位？

## 核心回答

先用 React DevTools Profiler 看是哪次交互、哪个组件和哪段提交耗时，再看是计算慢、组件更新范围太大，还是 DOM 太多。确认原因后再决定拆组件、稳定 props、缓存计算、虚拟列表或延后非关键工作。

memo、useMemo、useCallback 都有比较和维护依赖的成本，不能当成默认装饰。比如一个组件每次都收到新的对象字面量，单独给它加 memo 可能没有效果；先让数据和边界稳定，优化才有意义。

