---
id: lidi-202609-import-03-frameworks-vue-component-v-model-q03
title: v-model 修饰符怎么传？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [v-model, modelValue, update:modelValue, Vue 组件]
---

# v-model 修饰符怎么传？

## 核心回答

修饰符会作为额外信息传给组件，组件可以据此做 trim、number 等处理。自定义修饰符要在组件接口里明确说明，不能默认把所有输入都转成数字，避免丢失原始文本。

