---
id: lidi-202609-react-q02
title: `useEffect` 为什么需要清理函数？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [React19, Hooks, useEffect, Redux Toolkit, memo, 受控组件]
---

# `useEffect` 为什么需要清理函数？

## 核心回答

1. 订阅、定时器、事件监听和图表实例不会因为组件从页面消失就自动全部清理。
2. 如果不清理，用户每进入一次页面，就可能多绑定一次监听器，导致回调执行多次，也可能造成内存泄漏。
3. 城市视图中，ResizeObserver、ECharts 实例和可能存在的定时刷新都需要在卸载时处理。
4. 异步请求还要防止组件已经卸载后更新状态，可以取消请求，或者在结果回来时确认当前请求仍然有效。

