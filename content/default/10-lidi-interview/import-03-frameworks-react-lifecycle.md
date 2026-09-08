---
id: lidi-202609-import-03-frameworks-react-lifecycle
title: React 生命周期说说看？哪些被废弃了？
aliases: [react生命周期, 生命周期, getDerivedStateFromProps, 废弃生命周期]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [生命周期, componentDidMount, getDerivedStateFromProps, UNSAFE]
---

# React 生命周期说说看？哪些被废弃了？

## 核心回答

1. 类组件按挂载、更新、卸载来看。挂载时初始化状态，跑 `render`，DOM 提交完再跑 `componentDidMount`。要订阅、要操作已经挂上的节点，放提交之后，别放构造函数或 `render` 里。

2. 更新阶段可能碰到 `getDerivedStateFromProps`、`shouldComponentUpdate`、`render`，提交前有 `getSnapshotBeforeUpdate`，提交后有 `componentDidUpdate`。不是每次更新都要把这些全写上。`componentDidUpdate` 里改 state 尤其要有条件，不然容易一遍遍更新。

3. `componentWillUnmount` 负责把监听、定时器这些释放掉。老的 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 被标成不安全的旧生命周期。带 `UNSAFE_` 前缀的在老代码里还能见到，新代码别再当常规用法。

4. 渲染阶段可能重复执行，也可能被放弃，在这些阶段里发请求、改外面的东西不可靠。函数组件用 Effect 说同步和清理，但别拿生命周期一个个对上去。按依赖和业务行为重新组织。派生值直接算，不必为了对应某个生命周期再存一份 state。

5. 比如滚动列表更新前要记住当前位置，提交前读必要的旧布局，更新后再按新布局恢复。这就是快照和提交后处理的差别。普通条件判断优先靠数据。生命周期方法很多，简单功能别拆进所有方法里，前后依赖会缠在一起。

## 追问：componentDidUpdate 里发请求怎样避免无限循环？

1. 比较真正影响这次请求的输入，比如 `prevProps.userId` 和现在的 `userId`。只有编号变了才重新拉详情。任意 state 一变就请求，请求结果再 `setState`，就会转圈。

2. 比较要覆盖完整查询条件，别只看一个碰巧会变的字段。筛选和页码一起决定列表，两者都要管请求。筛选变了按规则把页码重置，不然会拿到错误页的数据。

3. 请求竞态、卸载后的结果还要另外处理。条件判断只能少发重复请求，挡不住旧响应回写。快速切换编号、请求失败、离开页面都要测，别只确认正常情况能看到一次接口结果。

## 追问：getDerivedStateFromProps 适合把所有 props 同步到 state 吗？

1. 不适合。容易搞出两份要对齐的数据。输入草稿既听父组件 props，又在子组件里改。父级一次无关更新若再复制一遍，可能把用户正在输入的盖掉，字段看起来像改不动。

2. 纯派生的直接算。完全由父级管的值就受控。换成另一个对象时明确重置。只有少量「props 变了、内部状态也要跟着调」的场景才用这个方法，并且留下足够信息判断是哪一次变化。

3. 这个方法跟渲染相关，保持纯粹，里面别请求、别动 DOM。更直接的数据流能说清楚，就不用它。它也不是旧 `componentWillReceiveProps` 的通用替换。
