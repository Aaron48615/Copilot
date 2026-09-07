---
id: lidi-202609-import-02-javascript-unknown-never-q01
title: 怎么写一个类型守卫？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [unknown, any, never, 类型收窄]
---

# 怎么写一个类型守卫？

## 核心回答

让函数返回 `value is User`，在函数里检查对象非空、字段存在以及字段类型。这样调用方通过 if 以后，TypeScript 会把 value 收窄成 User。检查函数不能只返回“看起来像”，否则运行时仍可能被坏数据击穿。
