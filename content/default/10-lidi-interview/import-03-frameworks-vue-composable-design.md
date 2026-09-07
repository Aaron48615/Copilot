---
id: lidi-202609-import-03-frameworks-vue-composable-design
title: Vue 的 composable 应该怎么设计？
aliases: [组合式函数, useSearch, Vue 逻辑复用]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [composable, Composition API, use, 逻辑复用]
---

# Vue 的 composable 应该怎么设计？

## 核心回答

一个 composable 最好围绕一个完整的功能，比如搜索或分页，而不是按“所有 ref 放一起”随便抽。它接收必要参数，返回状态、计算值和操作函数，并说明调用时机。请求、定时器和事件监听都要在组件卸载时清理。

我会让返回值尽量稳定、名字表达意图，必要时支持传入 ref 或普通值。逻辑复用的同时不能把页面业务偷偷藏进去，否则调用方看不出它依赖什么、什么时候会发请求。

