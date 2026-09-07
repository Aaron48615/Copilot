---
id: lidi-202609-import-03-frameworks-vue-next-tick
title: Vue 的 nextTick 解决什么问题？
aliases: [Vue DOM 更新时机, nextTick 使用场景]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [nextTick, DOM 更新, 响应式]
---

# Vue 的 nextTick 解决什么问题？

## 核心回答

修改响应式状态后，Vue 通常会把 DOM 更新合并到异步更新队列里。`nextTick` 用来等这次更新完成，再读取已经变化的 DOM。比如切换一个面板后，需要把焦点放到新出现的输入框，就可以在状态修改后 await nextTick。

它只保证 Vue 的 DOM 更新完成，不保证图片、字体或第三方地图已经加载，也不能修复状态设计本身的问题。读取布局前还要确认元素确实渲染出来了。

