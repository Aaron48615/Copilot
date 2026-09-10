---
id: aaron-basic-vue-vue3-directive-diff
title: v-for、v-if 的优先级，以及 Vue 2 和 Vue 3 的 Diff 区别
aliases: [请讲讲：v-for、v-if 的优先级，以及 Vue 2 和 Vue 3 的 Diff 区别, 关于“v-for、v-if 的优先级，以及 Vue 2 和 Vue 3 的 Diff 区别”，你会怎样回答？]
category: vue
difficulty: 深入
priority: normal
projects: []
keywords: [v-for, v-if, Diff, 最长递增子序列]
---

# v-for、v-if 的优先级，以及 Vue 2 和 Vue 3 的 Diff 区别

## 核心回答

Vue 2 同一个元素上是 v-for 优先，Vue 3 是 v-if 优先，所以 Vue 3 的 v-if 不能直接依赖同一元素上 v-for 才创建的 item。实际写代码我会把它们拆开：整段列表是否显示，用外层条件；按每一项过滤，先用 computed 得到需要展示的列表，避免靠优先级理解代码。

Diff 方面，两者都会比较新旧虚拟节点，尽量复用类型和身份匹配的节点。Vue 2 的有 key 子节点更新主要采用双端比较；Vue 3 会先同步处理相同的头部和尾部，再处理剩下的中间部分，建立 key 对应关系，需要移动时用最长递增子序列找出可以保持相对顺序的节点，减少移动。

另外，Vue 3 还结合编译阶段提供的动态标记，跳过一些不需要检查的部分。所以不能只概括成“Vue 2 双向、Vue 3 单向”，也不能说 Vue 2 一遇到移动就会算错位置。

【key 在同级中要稳定唯一，优先使用数据 ID。最长递增子序列主要用于需要移动的有 key 子序列，不代表所有节点比较都会完整执行这一套流程。】
