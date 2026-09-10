---
id: aaron-basic-vue-composable-design
title: Vue 的 composable 应该怎么设计？
aliases: [什么时候把 Vue 逻辑抽成组合函数？, 多个组件怎么复用有状态的逻辑？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [composable, 逻辑复用, ref, 生命周期]
---

# Vue 的 composable 应该怎么设计？

## 核心回答

几个组件都要管理查询条件、请求结果时，我更喜欢把这套有状态的逻辑抽成 useSearch 这样的组合函数，不用每个组件再写一遍。它负责相关状态和操作，页面怎么摆、按钮叫什么，还是留给组件决定。

输入和返回值要说清楚，调用的时候才好理解。要跟着参数变化重新执行，就接收 ref 或 getter 并监听，而不是只传进来一个当时的字符串。返回 ref 和方法，组件用起来也比较直观。

状态如果每次调用都应该独立，就放在函数里面创建；放到模块外面，多个组件可能会共用同一份。监听、定时器这些也要在不用时清理。只有一段纯计算的话，写普通函数就够了，不需要特意包装成组合函数。
