---
id: lidi-202609-react-q03
title: `useMemo` 和 `useCallback` 有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [React19, Hooks, useEffect, Redux Toolkit, memo, 受控组件]
---

# `useMemo` 和 `useCallback` 有什么区别？

## 核心回答

1. `useMemo` 缓存计算结果，`useCallback` 缓存函数引用。
2. 如果子组件使用 `React.memo`，父组件每次渲染都创建一个新函数，可能导致子组件仍然重新渲染，这时 `useCallback` 可能有帮助。
3. 如果计算本身很简单，使用 `useMemo` 反而增加了理解成本和依赖维护成本，不一定更快。
4. 我会先通过 React DevTools 或实际性能表现确认问题，再决定是否缓存，而不是把所有函数都包起来。

