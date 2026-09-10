---
id: aaron-basic-react-redux-data-flow
title: Redux 是什么，数据流、React 接入和优缺点
aliases: [请讲讲：Redux 是什么，数据流、React 接入和优缺点, 关于“Redux 是什么，数据流、React 接入和优缺点”，你会怎样回答？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [Redux, store, action, reducer]
---

# Redux 是什么，数据流、React 接入和优缺点

## 核心回答

Redux 是集中管理状态的库，适合多个组件共享，而且修改过程需要比较清楚的数据。store 保存状态，action 描述发生了什么，dispatch 发出 action，reducer 根据旧 state 和 action 计算新 state，再通知订阅者，让相关界面更新。

它的核心原则是单一状态树、通过 action 描述修改、用纯 reducer 计算结果。reducer 里不发请求，也不直接修改原来的状态。使用 Redux Toolkit 时可以写看起来像修改对象的代码，是因为内部通过 Immer 生成不可变更新，并不是允许随意修改 store 里的旧对象。

React 接入通常是在上层放 Provider，再通过 useSelector 读取需要的状态、useDispatch 派发 action；旧代码里也会看到 connect 和 mapStateToProps。这样组件可以直接订阅需要的部分，不需要所有数据都从父组件逐层传下来。

我觉得它的好处是状态修改路径明确，方便调试、测试和团队协作；代价是要维护 store、action、reducer 和相关约定，小页面可能显得重。如果选择器每次返回新对象，也可能导致不必要的更新，所以全局状态范围和选择器都要设计好。

【传统 createStore 的参数是 reducer、可选的 preloadedState、enhancer，多个 reducer 可以用 combineReducers 合并；新项目通常用 configureStore、createSlice。Redux 本身不自动持久化，刷新恢复需要单独处理，也不是所有界面局部状态都必须进入 store。】
