---
id: aaron-basic-vue-dom-custom-directives
title: Vue 怎么操作 DOM，自定义指令什么时候用
aliases: [请讲讲：Vue 怎么操作 DOM，自定义指令什么时候用, 关于“Vue 怎么操作 DOM，自定义指令什么时候用”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [DOM, ref, nextTick, 自定义指令]
---

# Vue 怎么操作 DOM，自定义指令什么时候用

## 核心回答

能通过状态和模板表达的变化，我会先用数据驱动。确实需要拿真实 DOM 的时候，比如聚焦输入框、量尺寸或初始化图表，可以在元素上写 ref，挂载后通过 this.$refs 访问；ref 放在组件上拿到的是组件实例，和 DOM 节点要区分。

数据修改后 DOM 不会立即同步完成，需要读更新后的尺寸时，可以等待 nextTick。首次初始化需要 DOM 的逻辑，应该放在 mounted 等合适时机，不能认为在 created 里套一个 nextTick 就能保证所有场景都拿到节点。

多个地方都要复用一段底层 DOM 行为，可以封装成自定义指令。Vue 2 全局用 Vue.directive，局部放在 directives 选项里；注册名字不带 v-，使用时带 v-。常见钩子有 bind 做初始化，inserted 在插入父节点后执行，update、componentUpdated 处理更新，unbind 清理。

【钩子的 el 是绑定元素，binding 提供值、参数和修饰符，vnode 是当前虚拟节点，部分更新钩子还有 oldVnode。inserted 只保证已经插入父节点，不保证一定进入文档。Vue 3 指令钩子改为 created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted 等，要按版本区分。】
