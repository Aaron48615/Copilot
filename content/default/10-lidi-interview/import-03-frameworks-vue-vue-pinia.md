---
id: lidi-202609-import-03-frameworks-vue-vue-pinia
title: 谈谈 Pinia？为什么取代了 Vuex？
aliases: [pinia, vuex区别, 状态管理, defineStore]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Pinia, Vuex, defineStore, TypeScript, 状态管理]
---

# 谈谈 Pinia？为什么取代了 Vuex？

## 核心回答

Pinia 是 Vue 官方推荐的状态管理库，Vuex 4 之后基本处于维护模式，Vuex 官方仓库都说 Pinia 基本就是 Vuex 5，所以新项目没有理由再用 Vuex。它最关键的改动是砍掉了 mutation，只剩 state、getters、actions：action 里同步异步随便写，改 state 也不用绕 commit，心智负担小一大截。

其他优点：TypeScript 支持是完整的类型推导，不用像 Vuex 那样写泛型套娃；没有 module 嵌套，就是平铺的多个 store，各自用 defineStore 定义、自动注册，谁用谁 import，代码分割也自然；DevTools 和 SSR 都支持。

轻购目前没有用 Pinia。购物车数据放在页面里，通过接口获取和更新；登录 Token 用单独的工具函数读写；下单参数通过 sessionStorage 暂存。按现在的功能，这些方式就能完成页面之间的数据传递。如果以后很多页面都要同步购物车数量、用户信息，我会考虑把这部分共享状态放进 Pinia，方便统一更新。

