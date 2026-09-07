---
id: lidi-202609-import-04-browser-network-engineering-web-vitals-q03
title: INP 高时先查什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LCP, INP, CLS, Web Vitals, 性能]
---

# INP 高时先查什么？

## 核心回答

看交互时有没有长 JavaScript 任务、同步布局或大范围组件更新。可以拆任务、延后非关键工作、减少渲染范围和优化事件处理，但要用时间线确认改动确实影响了那次交互。

