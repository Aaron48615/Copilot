---
id: lidi-202609-import-03-frameworks-react-reducer-context
title: useReducer、Context 和 Redux 怎么取舍？
aliases: [React 状态管理选型, Context Redux, useReducer]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useReducer, Context, Redux, 状态管理]
---

# useReducer、Context 和 Redux 怎么取舍？

## 核心回答

组件内部状态简单就用 useState；状态转移多、事件和状态关系复杂，可以用 useReducer；父子层级较深但范围不大的共享依赖，可以用 Context。Redux 更适合跨很多页面、需要明确 action 记录、selector 订阅和开发工具的全局状态。

Context 解决的是“怎么把值传下去”，不是完整的状态管理方案。Provider value 变化时，下面订阅它的组件都可能更新，不能把所有业务数据都塞进一个大 Context。选型看状态范围、更新频率、调试需求和团队习惯。

