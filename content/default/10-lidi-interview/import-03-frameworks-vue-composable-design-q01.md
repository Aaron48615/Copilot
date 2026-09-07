---
id: lidi-202609-import-03-frameworks-vue-composable-design-q01
title: composable 能共享状态吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [composable, Composition API, use, 逻辑复用]
---

# composable 能共享状态吗？

## 核心回答

默认每次调用都会创建自己的状态。如果要共享，需要把状态放到模块级、Pinia 或其他明确的 store，并说明生命周期和清理方式。不能因为函数名字相同，就以为不同组件会自动共享数据。

