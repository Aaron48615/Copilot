---
id: vue2-vs-vue3
title: Vue 2 和 Vue 3 有什么区别？
aliases: [vue2和vue3区别, vue3相比vue2, vue版本区别]
category: vue
difficulty: 高频
priority: high
projects: []
keywords: [Proxy, Composition API, TypeScript, tree shaking]
---

# Vue 2 和 Vue 3 有什么区别？

## 核心回答

主要差别在响应式实现和代码组织。Vue 2 主要用 Object.defineProperty 拦截属性读写，给对象新增属性、直接改数组下标等操作需要特别处理。Vue 3 使用 Proxy，可以拦截更多操作。

Vue 3 也提供 Composition API、script setup、多根节点等能力，对 TypeScript 的配合更方便。维护 Vue 2 项目时，仍要理解它的响应式限制和已有组件写法。

## 追问：Vue 2 新增属性怎样触发更新？

可以用 Vue.set 或实例的 $set，数组可以用 splice。也可以创建新对象或新数组，再替换原来的响应式字段。直接给已有对象加一个未被观测过的属性，Vue 2 通常不能自动追踪。
