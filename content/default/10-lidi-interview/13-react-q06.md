---
id: lidi-202609-react-q06
title: React 常见 Hooks
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [React, Hooks, useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, useLayoutEffect]
---

# React 常见 Hooks

React 常用的 Hooks 我主要用过 `useState`、`useEffect`、`useRef`、`useMemo`、`useCallback` 和 `useContext`。

`useState` 是用来管理组件内部状态的，状态更新之后会触发组件重新渲染。

`useEffect` 主要处理副作用，比如请求接口、监听事件、定时器这些。它可以通过依赖数组控制什么时候执行，返回一个函数还能做清理，比如移除监听或者清除定时器。

`useRef` 我一般有两种用法，一种是获取 DOM 元素，另一种是保存一个值。它和 `useState` 的区别是，`useState` 更新会触发重新渲染，而 `useRef` 修改 `.current` 不会触发重新渲染，所以适合保存一些不需要展示在页面上的值。

`useMemo` 和 `useCallback` 主要用于性能优化。`useMemo` 缓存的是计算结果，`useCallback` 缓存的是函数。它们都会根据依赖项判断是否重新计算。

这里比较容易混的是 `useMemo` 和 `useCallback`：如果我要缓存一个计算结果，我会用 `useMemo`；如果我要缓存一个函数引用，一般会用 `useCallback`。

`useContext` 主要用于跨组件共享数据，比如主题、用户信息这些，可以减少多层组件一直通过 props 往下传。

另外 `useReducer` 也了解，它和 `useState` 都可以管理状态。状态比较简单时我一般会用 `useState`，如果状态比较复杂，或者多个状态之间的更新逻辑关联比较强，可以考虑 `useReducer`。

还有一个比较常问的是 `useEffect` 和 `useLayoutEffect`。两者都可以处理副作用，区别主要在执行时机：`useEffect` 是浏览器完成页面绘制之后执行，`useLayoutEffect` 会在浏览器绘制之前同步执行，所以涉及 DOM 测量或者需要避免页面闪动的场景，可以考虑 `useLayoutEffect`，一般业务场景优先用 `useEffect`。
