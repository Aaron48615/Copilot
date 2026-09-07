---
id: react-common-hooks
title: React 常用的 Hooks 有哪些？
aliases: [常用hooks, react hooks, useState useEffect]
category: react
difficulty: 基础
priority: high
projects: []
keywords: [useState, useEffect, useMemo, useRef, useCallback]
---

# React 常用的 Hooks 有哪些？

## 核心回答

useState 保存组件状态；useEffect 处理订阅、请求等需要和外部系统同步的工作；useRef 保存 DOM 或不需要触发渲染的值。useMemo 缓存计算结果，useCallback 缓存函数引用。

比如一个图表组件，可以用 state 保存筛选条件，用 ref 保存图表实例，在 Effect 里初始化和更新，并在清理函数里释放实例。

## 追问：是不是所有计算和函数都应该缓存？

不用。缓存也要维护依赖。计算明显耗时，或者子组件确实依赖稳定的引用时，缓存才更有意义。先确认哪里发生了多余计算或渲染，再决定要不要加 useMemo、useCallback。
