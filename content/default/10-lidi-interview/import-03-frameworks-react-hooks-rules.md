---
id: lidi-202609-import-03-frameworks-react-hooks-rules
title: Hooks 为什么不能写在条件分支里？
aliases: [hooks规则, rules of hooks, useState原理, hooks原理]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [调用顺序, 条件渲染, memo, useCallback]
---

# Hooks 为什么不能写在条件分支里？

## 核心回答

因为 React 是靠调用顺序来对应状态的。函数组件每次渲染都是整个函数重新执行，React 按钩子调用的顺序记账：第一次渲染是什么顺序，之后每次都得一模一样，useState 才能找到自己那份值。写在 if 里的话，某个分支少调了一个钩子，后面所有钩子整体错一位，状态就全串了。

所以正确的写法不是用 if 包住 Hook，而是把条件放进 Hook 内部。比如"登录之后才轮询"，是让 useEffect 的依赖里放登录状态，在 effect 里面决定要不要启动。

useMemo 和 useCallback 我不会无脑全加，它们自己也有成本。三种情况才值得用：计算真的贵；要传给被 memo 的子组件，需要引用稳定；或者它是 useEffect 的依赖。城市视图里我就是按这个标准筛的。工程上装 eslint-plugin-react-hooks，违反规则直接报红，不靠自觉。

