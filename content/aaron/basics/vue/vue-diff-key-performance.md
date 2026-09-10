---
id: aaron-basic-vue-vue-diff-key-performance
title: Vue 的 Diff、key 和性能优化怎么理解
aliases: [请讲讲：Vue 的 Diff、key 和性能优化怎么理解, 关于“Vue 的 Diff、key 和性能优化怎么理解”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [Diff, key, Vue2, 性能优化]
---

# Vue 的 Diff、key 和性能优化怎么理解

## 核心回答

Vue 用虚拟节点描述界面，更新时比较新旧节点，尽量复用可以继续使用的真实 DOM。比较主要在相同层级进行，类型不同就可能替换；列表里的 key 用来判断节点身份，应该在同一组兄弟节点中稳定且唯一，比如使用数据 ID。

Vue 2 对有 key 的子节点会用双端比较等方式，从新旧列表的头尾找可以复用的节点，再处理剩余部分。它不是每次都重建整棵 DOM，也不保证找到理论上绝对最少的操作。列表有插入、删除和排序时，用索引当 key 可能让组件局部状态和数据对不上。

性能上我会把模板里的复杂派生计算放进 computed，按切换情况选择 v-if、v-show，组件库按需引入、路由用动态 import 懒加载。长列表可以分页或虚拟化，对大范围深度监听和频繁更新也要检查。Flex 是布局选择，不能把“少用 float”直接等同于 Vue 的更新优化。

【稳定的 key 首先保证身份对应正确，不是单纯给 Diff 加速；故意修改 key 会让组件重新创建，适合需要重置状态的场景，但也意味着原来的状态会丢失。】
