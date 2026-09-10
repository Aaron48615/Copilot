---
id: aaron-basic-vue-component-communication
title: Vue 组件之间怎么通信
aliases: [请讲讲：Vue 组件之间怎么通信, 关于“Vue 组件之间怎么通信”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [组件通信, props, emit, provide, inject]
---

# Vue 组件之间怎么通信

## 核心回答

我会先看组件之间是什么关系。父传子用 props，子传父用 $emit 发事件，父组件监听后更新自己的状态；兄弟组件可以把共享状态放到共同父组件，通过这两种方式连接起来。

层级比较深时可以用 provide/inject，让祖先给后代提供数据或方法；很多不相关的组件都要使用同一份状态时，再考虑 Vuex 或 Pinia。Vue 2 还可以用 EventBus 发布订阅，但要记得解除监听，避免事件关系越来越难追踪。

还有 $attrs、$listeners 可以帮助包装组件透传属性和事件，插槽用来传递展示内容，作用域插槽可以把子组件数据交给父组件提供的模板。ref 则是直接拿实例调用方法，适合聚焦、打开弹窗等必要的命令式操作，不会把它当成所有数据通信的默认方式。

【Vue 3 的事件监听也合并到了 $attrs，实例上的 $on、$off 等 EventBus 用法已经移除。Vue 2 的 provide/inject 也不能一概当作自动响应式，需要看传入的数据本身是否可响应。】
