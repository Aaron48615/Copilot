---
id: lidi-202609-react-q01
title: `useEffect` 的依赖数组怎么理解？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [React19, Hooks, useEffect, Redux Toolkit, memo, 受控组件]
---

# `useEffect` 的依赖数组怎么理解？

## 核心回答

1. 依赖数组表示这个副作用依赖哪些外部值。依赖变化时，React 会重新执行 effect，并在重新执行前调用上一次的清理函数。
2. 空数组通常表示只在组件挂载后执行一次，但 effect 中如果使用了外部变量，仍然要考虑闭包拿到的是不是最新值。
3. 不写依赖数组会在每次渲染后执行，容易造成重复请求或重复绑定。
4. 在图表场景里，我会把实例初始化、数据更新和容器尺寸监听分开考虑，避免一个 effect 因为任意小状态变化就重新创建整张图。

