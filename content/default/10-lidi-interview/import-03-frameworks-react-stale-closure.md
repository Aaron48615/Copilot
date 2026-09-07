---
id: lidi-202609-import-03-frameworks-react-stale-closure
title: React 的 stale closure 是什么，怎么处理？
aliases: [React 闭包旧值, 定时器读旧 state, 请求竞态]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [stale closure, 闭包, useRef, useEffect]
---

# React 的 stale closure 是什么，怎么处理？

## 核心回答

函数会记住它创建那次 render 的变量。如果把这个函数交给定时器、事件监听或异步请求，等它稍后执行时，里面可能还是旧 state，这就是 stale closure。它不是 React 随机丢数据，而是 JavaScript 闭包和 render 快照共同产生的结果。

处理方式看需求：更新 state 用函数式 setter；Effect 需要跟着值变化就把值放进依赖并在清理时重绑；确实只想读取最新值、又不想因此重新订阅时，可以用 ref 保存最新值。ref 不是万能的状态替代品，因为修改 ref 不会触发渲染。

