---
id: react-hooks-rules
title: Hooks 为什么不能写在条件分支里？
aliases: [hooks规则, rules of hooks, useState原理, hooks原理]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [调用顺序, 条件渲染, memo, useCallback]
---

# Hooks 为什么不能写在条件分支里？

## 核心回答

useState、useEffect 这类 Hook 要在组件或自定义 Hook 的顶层调用，不能放进条件、循环或普通回调里。React 需要靠稳定的调用顺序对应每一次渲染中的状态。

如果只想在某个条件下执行 Effect，可以把判断写进 Effect 内部。依赖数组也应该包含回调实际使用的响应式值，避免读到旧数据。

## 追问：useMemo、useCallback 和 Hook 顺序规则是一回事吗？

不是。顺序规则保证 Hook 能正确关联状态，缓存是性能方面的选择。不能靠遗漏依赖来强行维持引用不变。React 的 use API 有单独的调用规则，不应把它和普通状态 Hook 混在一起。
