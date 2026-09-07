---
id: lidi-202609-import-08-coding-reactive-mini-q01
title: 这个实现最容易漏什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [响应式, Proxy, effect, computed]
---

# 这个实现最容易漏什么？

## 核心回答

会漏掉嵌套对象、数组 length、删除属性、effect 递归触发和停止订阅。还要防止 effect 自己修改依赖造成无限循环，并决定调度器怎样合并重复更新。面试里我会先实现单层对象，再主动说清楚这些边界，不把几十行 demo 说成完整框架。

