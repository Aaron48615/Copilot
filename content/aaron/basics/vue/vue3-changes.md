---
id: aaron-basic-vue-vue3-changes
title: Vue 3 相比 Vue 2 有哪些变化，为什么更新更高效
aliases: [请讲讲：Vue 3 相比 Vue 2 有哪些变化，为什么更新更高效, 关于“Vue 3 相比 Vue 2 有哪些变化，为什么更新更高效”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [Vue3, Proxy, PatchFlags, Teleport]
---

# Vue 3 相比 Vue 2 有哪些变化，为什么更新更高效

## 核心回答

Vue 3 的变化，我会从响应式、代码组织和渲染优化来讲。响应式从 Vue 2 的 Object.defineProperty 为主，变成用 Proxy 代理对象，对新增属性、删除属性、数组和集合的处理更完整。代码组织上，Composition API 更方便把一个功能的状态、计算和操作放在一起，也更方便抽成组合函数，TypeScript 支持更自然。

渲染时，编译器会分析哪些部分是静态的、哪些部分会变化，利用静态缓存、Patch Flags 和动态节点收集等信息，减少更新时不必要的比较。部分全局 API 也更方便按使用情况打包，所以不用的功能有机会被移除。

功能上还有多根节点、Teleport、watchEffect 等，应用入口用 createApp，很多全局配置改成应用级配置。比如弹窗可以用 Teleport 把 DOM 放到 body 下，但组件逻辑上的父子关系仍然保留。

我觉得最直接的收益是代码更容易按功能整理，更新时也有更多编译信息可以利用。不过具体项目能快多少还是要测，不能把 Composition API 本身当作性能保证，也不能说 Vue 3 使用了 React Fiber。

【Vue 3 仍然支持 Options API，Vue 2.7 也支持 Composition API，不能只按这两种写法判断版本。包体积会随版本、导入方式和构建配置变化，不背没有条件的固定数字。】
