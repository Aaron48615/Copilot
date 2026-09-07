---
id: lidi-202609-import-03-frameworks-vue-component-v-model-q01
title: 多个 v-model 怎么写？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [v-model, modelValue, update:modelValue, Vue 组件]
---

# 多个 v-model 怎么写？

## 核心回答

可以给模型加参数，比如 `v-model:visible`，组件对应 `visible` prop 和 `update:visible` 事件。每个模型都要有清楚的语义，不要把整个表单对象和多个独立字段混在一条双向绑定里。

