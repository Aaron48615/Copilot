---
id: aaron-basic-react-class-lifecycle
title: React 类组件的生命周期
aliases: [请讲讲：React 类组件的生命周期, 关于“React 类组件的生命周期”，你会怎样回答？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [类组件, 生命周期, render]
---

# React 类组件的生命周期

## 核心回答

React 类组件的生命周期可以按挂载、更新和卸载来讲。挂载常见顺序是 constructor 初始化，再到 getDerivedStateFromProps、render，DOM 提交后执行 componentDidMount；请求或订阅可以在挂载后开始。

更新时，通常经过 getDerivedStateFromProps、shouldComponentUpdate、render，提交 DOM 前可以用 getSnapshotBeforeUpdate 读取旧界面的信息，提交后执行 componentDidUpdate。比如更新列表前记录滚动位置，再根据 snapshot 调整。卸载时是 componentWillUnmount，用来清理订阅、定时器等。

render 应该只根据 props 和 state 计算界面，props 是只读的，不能直接修改；也不能在 render 里无条件 setState。componentDidUpdate 如果需要改状态，要比较条件，避免形成更新循环。shouldComponentUpdate 是控制是否需要重新渲染的优化判断，不是默认会帮我们做深比较。

【getDerivedStateFromProps 返回需要合并到状态的对象，或者返回 null；不要随便把 props 复制成另一份 state。componentDidCatch 用于错误边界记录后代渲染错误，通常配合 getDerivedStateFromError 展示回退界面。componentWillMount、componentWillReceiveProps、componentWillUpdate 是旧生命周期，新代码避免依赖，旧项目可能看到 UNSAFE_ 前缀。】
