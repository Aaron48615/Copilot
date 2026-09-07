---
id: lidi-202609-import-03-frameworks-vue-next-tick-q01
title: 什么时候不该用 nextTick？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [nextTick, DOM 更新, 响应式]
---

# 什么时候不该用 nextTick？

## 核心回答

只是计算数据、更新另一个响应式变量时不需要它。滥用 nextTick 会让代码依赖具体刷新时序，难以理解。能通过 computed、watch 或模板自然完成的事情，不要加一层等待。

