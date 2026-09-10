---
id: aaron-basic-vue-v-model
title: v-model 的原理是什么
aliases: [请讲讲：v-model 的原理是什么, 关于“v-model 的原理是什么”，你会怎样回答？]
category: vue
difficulty: 基础
priority: high
projects: []
keywords: [v-model, 双向绑定, input, modelValue]
---

# v-model 的原理是什么

## 核心回答

v-model 可以理解成“值绑定加事件更新”的语法糖。普通文本输入框上，相当于给 value 绑定状态，再监听 input，把输入的新值写回状态；状态再通过响应式系统更新到界面，所以形成双向绑定的效果。

Vue 2 自定义组件默认是 value 这个 prop 加 input 事件，也可以用 model 选项改对应名称。Vue 3 默认改成 modelValue 和 update:modelValue。子组件收到值后，通过事件通知父组件更新，而不是直接修改 prop。

【复选框和单选框涉及 checked、change，select 也主要监听 change，因此不能把所有表单控件都只背成 value 加 input。响应式系统负责状态到视图的更新，事件监听负责输入到状态的更新，这两个部分共同完成绑定。】
