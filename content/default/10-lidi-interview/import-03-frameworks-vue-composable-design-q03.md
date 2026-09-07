---
id: lidi-202609-import-03-frameworks-vue-composable-design-q03
title: 为什么不把所有页面逻辑都抽成 composable？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [composable, Composition API, use, 逻辑复用]
---

# 为什么不把所有页面逻辑都抽成 composable？

## 核心回答

抽取有成本。只有逻辑确实复用、变化独立或页面已经难以阅读时才值得抽。只使用一次、且和页面结构紧密绑定的几行代码留在组件里更直观。

