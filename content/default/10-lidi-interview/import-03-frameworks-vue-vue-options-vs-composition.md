---
id: lidi-202609-import-03-frameworks-vue-vue-options-vs-composition
title: Options API 和 Composition API 有什么区别？
aliases: [选项式api, 组合式api, composition api, 逻辑复用, mixin]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Options API, Composition API, mixin, composable, setup]
---

# Options API 和 Composition API 有什么区别？

## 核心回答

1. Options API 按 `data`、`methods`、`computed`、生命周期这些选项组织。结构固定，简单页面容易找到状态和方法。功能一复杂，同一个搜索流程的状态、监听、请求、清理可能拆在好几处，改一处要在几个选项之间来回翻。

2. Composition API 可以按功能把相关状态和行为放一起，再抽成 composable。搜索条件、请求状态、取消逻辑一组，弹窗草稿另成一组，围着某个业务需求读和改，不必按 API 类型把逻辑拆散。

3. 组合式用普通变量和函数，不靠组件 `this`，类型推断和跨函数组合比较顺。复用也比 mixin 那种隐式往组件里塞属性更明白，调用处能看到来源和返回值。mixin 还有命名冲突、数据从哪来看不出来的老问题。函数抽得太碎、参数过多，阅读成本照样上去，写法本身不保证好维护。

4. 两套 API 用的都是 Vue 的组件和响应式，不是两个完全不同的运行时。Options API 适合既有代码和某些简单组件，Composition API 可以在同一项目里逐步用。没必要只为风格一致，把所有旧页面一次性重写。

5. 两个都在项目里用过：智服工单是 Vue 2 的 Options API，轻购是 Vue 3 的 `script setup`。表单、列表这种简单页差别不大；带筛选、联动、好几个弹窗的复杂页，组合式更好维护，搜索还能抽成 `useSearch` 给别的页面用。新复杂功能倾向组合式，已经稳定的小组件可以继续选项式。迁移先按行为理清初始化和清理，验证原有交互，再抽复用部分，别只把生命周期机械搬进一个很长的 `setup`。

## 追问：composable 比 mixin 更容易看懂，具体体现在哪里？

1. mixin 可能往组件里注入同名属性和方法，读组件时不容易知道某个字段从哪来，多个 mixin 还可能撞名。composable 在调用处显式导入、拿返回值，来源和命名由调用方掌握，依赖关系更直。

2. 两个 composable 返回相同字段名，解构时可以重命名，或整份结果对象留着，不必靠合并规则猜最后用哪一个。它们也能组合普通参数和 `ref`，一个行为依赖另一个时，用函数调用表达，不是隐式读组件 `this`。

3. 共享状态、监听清理、异步依赖还是要设计，composable 不会自动消掉所有耦合。每个函数职责具体，别靠模块单例偷偷共享数据，否则只是换一种形式重新造不透明来源。

## 追问：把旧组件迁到 Composition API，应该先改什么？

1. 先按业务行为列出相关数据、触发条件、资源，不是逐个选项翻译。用户编号决定详情请求，窗口变化决定图表尺寸，表单草稿决定校验。这些关系比原来代码属于 `methods` 还是 `watch` 更要紧。

2. 再把各行为的状态、监听、清理放一起，外面的 props、事件、展示结果先保持。纯派生用 `computed`，外部资源在正确生命周期管理。先行为等价，再决定抽不抽 composable。迁移和重新设计同时铺开，范围太大。

3. 验证覆盖首次加载、参数变化、失败、卸载，不只看页面能打开。代码更短但清理漏了、草稿重置错了，不算迁完。一个功能一个功能稳住，比一次改全部结构更容易定位问题。
