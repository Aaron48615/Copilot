---
id: lidi-202609-import-03-frameworks-vue-component-v-model-q02
title: 子组件为什么不能直接改 prop？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [v-model, modelValue, update:modelValue, Vue 组件]
---

# 子组件为什么不能直接改 prop？

## 核心回答

父组件传下来的值属于父组件，子组件直接修改会让数据流变得不可追踪，也可能在下一次父组件更新时被覆盖。触发事件让父组件决定是否接受修改，组件边界会更清楚。

