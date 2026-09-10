---
id: aaron-basic-browser-vue-scoped-deep
title: scoped 的作用和原理，怎么使用 deep
aliases: [请讲讲：scoped 的作用和原理，怎么使用 deep, 关于“scoped 的作用和原理，怎么使用 deep”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [scoped, deep, 样式隔离]
---

# scoped 的作用和原理，怎么使用 deep

## 核心回答

Vue 单文件组件的 scoped 会限制样式选择范围，避免一个组件里的普通选择器轻易影响其他组件。构建时会给相关元素加类似 data-v-xxx 的属性，再把样式改写成带对应属性的选择器，它不是浏览器原生 Shadow DOM 的隔离。

需要修改子组件内部样式时，可以在当前组件范围下写 :deep(.inner)，比如 .wrapper :deep(.inner)。这样既能匹配子组件内部，又保留外层限制，避免把全局同名元素一起改了。也可以另写非 scoped 样式，但要自己保证选择器范围。

【父组件的 scoped 样式可以影响子组件根节点，继承属性和全局样式也仍然可能参与，不能说 scoped 以后绝对互不影响。Vue 3 常用 :deep()，旧项目里可能看到 /deep/、>>>，要按构建版本判断。v-html 插入的内容没有自动获得同样的 scope 标记，需要考虑 deep 或适当的全局规则。】
