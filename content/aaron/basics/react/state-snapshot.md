---
id: aaron-basic-react-state-snapshot
title: React 为什么说 state 是一次渲染的快照？
aliases: [setState 后为什么立刻读取还是旧值？, 连续调用 setCount，为什么不一定累加多次？]
category: react
difficulty: 基础
priority: high
projects: []
keywords: [state快照, 函数式更新, 批处理, useState]
---

# React 为什么说 state 是一次渲染的快照？

## 核心回答

组件这一次执行拿到的 state，就是这次渲染对应的那份值。调用 setCount 是告诉 React 下次用新值渲染，不是立刻把当前函数里的 count 变量改掉，所以后面马上打印，看到的还是旧值。

比如 count 现在是 0，在同一次点击里连写三次 setCount(count + 1)，每次算出来的目标都是 1，不会自动变成 3。如果要根据前一次结果继续加，就写 setCount(c => c + 1)，React 会按队列把这些更新接着算。

这也能解释定时器为什么有时读到旧状态：回调记住的是创建它那次渲染的值。所以遇到旧值，先看这里需要的是点击当时的数据，还是后来的最新数据，两种需求的处理方式不一样。
