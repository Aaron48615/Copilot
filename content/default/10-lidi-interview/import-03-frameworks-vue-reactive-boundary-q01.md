---
id: lidi-202609-import-03-frameworks-vue-reactive-boundary-q01
title: 为什么解构 reactive 会丢响应式？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, track, trigger, computed, 响应式]
---

# 为什么解构 reactive 会丢响应式？

## 核心回答

解构以后拿到的是当时的值，不再经过原代理对象的属性读取。需要保留连接时可以用 toRef 或 toRefs；如果只是拿一次数据做计算，普通解构反而更简单。

