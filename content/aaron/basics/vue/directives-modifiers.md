---
id: aaron-basic-vue-directives-modifiers
title: Vue 常见指令、v-if 和 v-show，以及修饰符
aliases: [请讲讲：Vue 常见指令、v-if 和 v-show，以及修饰符, 关于“Vue 常见指令、v-if 和 v-show，以及修饰符”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [Vue指令, v-if, v-show, 修饰符]
---

# Vue 常见指令、v-if 和 v-show，以及修饰符

## 核心回答

Vue 的指令主要是在模板里表达数据和界面的关系。v-bind 绑定属性，简写是冒号；v-on 监听事件，简写是 @；v-model 处理表单值；v-for 渲染列表；v-text 更新文本，v-html 把内容作为 HTML 渲染，所以不能随便给它传不可信字符串。

条件显示常用 v-if 和 v-show。v-if 根据条件创建或销毁对应内容，可以配合 v-else-if、v-else；v-show 则是先渲染出来，再用 display 控制显示。频繁切换可以考虑 v-show，初始可能长期不显示、创建成本又比较高的内容可以考虑 v-if。

修饰符能把常见事件处理直接写在模板上，比如 .stop 阻止传播，.prevent 阻止默认行为，.once 只触发一次，.self 要求事件目标就是当前绑定元素。它们省的是重复代码，但要分清阻止冒泡和阻止默认行为不是一回事。

【v-cloak 配合 CSS 可以在模板编译前隐藏未处理的插值；v-pre 跳过这部分模板编译，v-once 只渲染一次。它们有具体使用场景，不是加上就能让页面更快。v-model 还有 .trim、.number、.lazy 等常用修饰符。】
