---
id: lidi-202609-import-02-javascript-discriminated-union-q01
title: 和 enum 有什么关系？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [联合类型, 状态机, loading, error, TypeScript]
---

# 和 enum 有什么关系？

## 核心回答

enum 可以集中定义一组值，但它本身不能表达每种状态携带的数据。可辨识联合的重点是“标签和数据绑定”，不是有没有一个枚举名字。小范围状态我通常直接用字符串联合，读取代码更直观。
