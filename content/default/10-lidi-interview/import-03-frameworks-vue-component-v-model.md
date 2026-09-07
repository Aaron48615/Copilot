---
id: lidi-202609-import-03-frameworks-vue-component-v-model
title: Vue 组件上的 v-model 是怎么工作的？
aliases: [Vue v-model 原理, defineModel, 自定义组件双向绑定]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [v-model, modelValue, update:modelValue, Vue 组件]
---

# Vue 组件上的 v-model 是怎么工作的？

## 核心回答

在组件上写 `v-model`，本质是把一个值作为 prop 传进去，再监听对应的更新事件。Vue 3 默认是 `modelValue` 和 `update:modelValue`；子组件不能直接改 prop，而是触发事件让父组件更新自己的状态。

这样数据流仍然是单向的，只是把传值和回传写法收进了一个语法糖。输入框、选择器、弹窗这类组件很适合用它，但复杂业务对象要明确哪些字段能改，避免看起来像随便双向修改。

