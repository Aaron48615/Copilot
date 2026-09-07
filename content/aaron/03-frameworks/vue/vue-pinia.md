---
id: vue-pinia
title: 谈谈 Pinia？为什么取代了 Vuex？
aliases: [pinia, vuex区别, 状态管理, defineStore]
category: vue
difficulty: 高频
priority: high
projects: []
keywords: [Pinia, Vuex, defineStore, TypeScript, 状态管理]
---

# 谈谈 Pinia？为什么取代了 Vuex？

## 核心回答

Pinia 用来管理多个组件需要共享的状态。一个 store 里可以定义 state、getter 和 action，分别放数据、派生值和修改逻辑。组件通过同一个 store 访问状态，不必把参数一层层传下去。

仅在一个页面使用的弹窗开关、输入框内容，放在组件里往往更简单。登录信息、跨页面共享的购物车数量，才更适合考虑放进 store。

## 追问：直接解构 store 会有什么问题？

直接解构状态可能丢失响应式连接。需要把状态和 getter 解构出来时，可以使用 storeToRefs；action 可以直接解构。持久化也不是自动发生的，需要明确选择保存哪些字段，以及退出登录时怎样清理。
