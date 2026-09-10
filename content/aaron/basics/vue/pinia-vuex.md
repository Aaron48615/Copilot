---
id: aaron-basic-vue-pinia-vuex
title: Pinia 是什么，和 Vuex 有什么区别
aliases: [请讲讲：Pinia 是什么，和 Vuex 有什么区别, 关于“Pinia 是什么，和 Vuex 有什么区别”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [Pinia, Vuex, storeToRefs]
---

# Pinia 是什么，和 Vuex 有什么区别

## 核心回答

Pinia 是 Vue 的状态管理库，用来管理多个组件共享的数据。它可以按用户、商品、购物车这些业务分别定义 store，核心还是 state、getters 和 actions；和 Vuex 比，不再要求额外经过 mutation，同步修改和异步逻辑都可以写在 action 里，也支持直接修改状态。

使用时先给应用安装 Pinia，再用 defineStore 定义带唯一 ID 的 store，组件里调用对应的 useStore 获取。它对 TypeScript、DevTools、服务端渲染和模块拆分都有支持，代码通常比传统 Vuex 少一些。

如果需要从 store 解构状态和 getter，可以用 storeToRefs 保留响应式，action 则可以直接取出来使用。我会把真正跨组件共享的内容放进去，不把所有页面的临时变量都集中成全局状态。

【Pinia 不会默认把状态保存到 localStorage，刷新恢复需要另外实现。SSR 要注意每个请求的状态隔离，不能把所有用户共用同一份服务端状态。】
