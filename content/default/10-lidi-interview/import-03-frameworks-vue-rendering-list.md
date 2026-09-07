---
id: lidi-202609-import-03-frameworks-vue-rendering-list
title: Vue 大列表和 v-for 渲染慢时怎么排查？
aliases: [Vue 大列表, 虚拟列表, v-for 性能]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Vue, v-for, 虚拟列表, key, 性能]
---

# Vue 大列表和 v-for 渲染慢时怎么排查？

## 核心回答

先看数据量、每行组件复杂度和更新频率，再决定稳定 key、分页、虚拟滚动或组件拆分。key 要代表业务实体，不能在排序或插入时使用 index；传给子组件的 props 尽量稳定，避免父组件小变化让整列都更新。长列表还要限制图片、阴影和同步计算，优化后用 Performance 和真实设备测滚动帧率、内存和交互延迟。

