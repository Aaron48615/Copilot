---
id: lidi-202609-import-03-frameworks-vue-async-component
title: Vue 的异步组件和 keep-alive 怎么取舍？
aliases: [defineAsyncComponent, Vue 页面缓存, 异步组件]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [异步组件, keep-alive, defineAsyncComponent, 缓存]
---

# Vue 的异步组件和 keep-alive 怎么取舍？

## 核心回答

异步组件是需要时才加载组件代码，适合不一定会访问的页面或很重的编辑器；keep-alive 是缓存已经创建过的组件实例，让用户切回来时保留页面状态。一个解决代码下载，一个解决实例生命周期，目的不同，可以一起使用。

缓存也会占内存，数据过期、用户切换账号或权限变化时可能需要失效。页面缓存前要确认保留筛选条件是好事，还是用户更希望每次进入都重新拉最新数据。

