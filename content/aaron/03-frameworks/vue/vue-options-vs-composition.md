---
id: vue-options-vs-composition
title: Options API 和 Composition API 有什么区别？
aliases: [选项式api, 组合式api, composition api, 逻辑复用, mixin]
category: vue
difficulty: 高频
priority: high
projects: []
keywords: [Options API, Composition API, mixin, composable, setup]
---

# Options API 和 Composition API 有什么区别？

## 核心回答

Options API 按 data、methods、computed 这些选项组织代码，小组件比较直观。Composition API 则可以把同一个功能的状态、计算和处理函数放在一起，复杂页面里更容易沿着一个功能读下来。

比如搜索涉及关键词、请求和加载状态，可以把这些逻辑整理成一个 composable，多个组件复用。不需要为了使用新写法，把所有简单组件都重新拆一遍。

## 追问：Composition API 和 mixin 相比有什么好处？

composable 的参数和返回值比较明确，读调用处就知道依赖什么、拿到了什么。mixin 会把内容合进组件，来源和同名冲突不容易看出来。composable 仍然需要合理拆分，过度拆分也会增加阅读成本。
