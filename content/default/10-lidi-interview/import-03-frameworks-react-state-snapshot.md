---
id: lidi-202609-import-03-frameworks-react-state-snapshot
title: React 为什么说 state 是一次 render 的快照？
aliases: [React setState 不立即更新, state snapshot, 批处理]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [state, snapshot, batching, setState, React]
---

# React 为什么说 state 是一次 render 的快照？

## 核心回答

组件函数每执行一次，就拿到那一轮 render 的 state 快照。调用 setter 是告诉 React“请用新值再渲染一次”，不会把当前函数里已经拿到的变量改掉。所以同一个点击处理函数里连续写三次 `setCount(count + 1)`，通常只会得到加一。

如果更新依赖前一个值，我会写函数式更新：`setCount(value => value + 1)`。这样 React 可以按队列顺序把每次更新接起来，也不会因为批处理或闭包拿到旧值。

