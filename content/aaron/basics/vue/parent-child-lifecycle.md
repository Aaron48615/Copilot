---
id: aaron-basic-vue-parent-child-lifecycle
title: Vue 生命周期和父子组件执行顺序
aliases: [请讲讲：Vue 生命周期和父子组件执行顺序, 关于“Vue 生命周期和父子组件执行顺序”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [Vue2, 生命周期, 父子组件]
---

# Vue 生命周期和父子组件执行顺序

## 核心回答

以 Vue 2 来说，生命周期可以分成创建、挂载、更新和销毁。beforeCreate 时响应式状态还没初始化好，created 时 data、方法等已经可用，但 DOM 还没挂载；beforeMount 在首次挂载前，mounted 在组件 DOM 挂载完成后，适合初始化需要 DOM 的功能。

数据变化触发更新时，beforeUpdate 在 DOM 更新前执行，这时数据已经变了，DOM 还可能是旧的；updated 在组件 DOM 更新后执行。销毁前后分别是 beforeDestroy 和 destroyed，定时器、外部事件订阅这些通常在销毁阶段清理。keep-alive 还有 activated 和 deactivated，表示激活和离开缓存显示状态，离开不等于销毁。

父子一起首次渲染时，通常是父 beforeCreate、created、beforeMount，然后子 beforeCreate、created、beforeMount，接着子 mounted，最后父 mounted。可以理解成父先开始创建，但要等子组件挂载完成，父才完成挂载。

父更新并影响到子组件时，常见顺序是父 beforeUpdate、子 beforeUpdate、子 updated、父 updated；如果只改子组件自己的局部状态，不需要父组件更新，就只走子组件的更新流程。销毁一般是父 beforeDestroy、子 beforeDestroy、子 destroyed、父 destroyed。

【这些顺序以普通同步父子组件为前提，异步组件和条件分支要结合实际渲染看。mounted 也不保证所有图片、异步请求都完成。Vue 3 把销毁钩子改名为 beforeUnmount、unmounted。】
