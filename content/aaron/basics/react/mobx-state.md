---
id: aaron-basic-react-mobx-state
title: MobX 的状态管理和几个常用 API
aliases: [请讲讲：MobX 的状态管理和几个常用 API, 关于“MobX 的状态管理和几个常用 API”，你会怎样回答？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [MobX, observable, action, autorun, reaction]
---

# MobX 的状态管理和几个常用 API

## 核心回答

MobX 通过响应式的方式管理状态。先把数据设为可观察，再让视图或副作用读取这些数据，之后修改状态时，相关计算和视图就能更新。React 组件通常用 observer 包装，它会跟踪渲染时读取的可观察数据。

observable 用来创建可观察状态，computed 从状态推导结果，action 组织状态修改。autorun 会先执行一次并自动收集依赖，依赖变化后再运行；reaction 把“观察什么”和“变化后做什么”分成两个函数，默认不立即执行后一个效果函数；when 则等条件满足后执行一次效果并停止观察。

我觉得它的写法比较直接，但也需要明确哪些数据应该可观察，以及副作用什么时候清理。和 Redux 比，它更偏依赖追踪，不能因此认为状态管理完全不需要约定。

【可以用 makeObservable 或 makeAutoObservable 配置状态，是否使用装饰器要看工具链。严格修改策略可以通过 configure 的 enforceActions 配置；autorun、reaction 等返回的清理函数要在不再使用时调用。】
