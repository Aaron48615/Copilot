---
id: lidi-202609-import-03-frameworks-react-effect-boundary
title: React 里什么时候应该用 useEffect？
aliases: [useEffect 使用场景, 不要滥用 Effect, Effect 和事件]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useEffect, Effect, 副作用, render, 事件]
---

# React 里什么时候应该用 useEffect？

## 核心回答

Effect 是把组件和外部系统同步的地方，比如订阅、定时器、网络请求或第三方实例。它不是“数据变化以后都要走的一段代码”。如果只是根据已有 props 和 state 算一个值，直接在 render 里计算或用 useMemo 就行，再加一个 Effect 和中间 state 反而多了一次渲染。

事件处理器负责用户明确触发的动作，比如点击提交订单；Effect 负责组件因为渲染而需要建立的连接，比如页面出现后订阅消息。区分清楚以后，依赖数组和清理函数都更容易写对。

