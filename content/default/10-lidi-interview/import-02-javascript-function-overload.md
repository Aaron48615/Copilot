---
id: lidi-202609-import-02-javascript-function-overload
title: TypeScript 函数重载和联合参数有什么区别？
aliases: [函数重载, 可变参数元组, 回调参数逆变]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, overload, union, tuple]
---

# TypeScript 函数重载和联合参数有什么区别？

## 核心回答

如果参数组合不同，且返回值会随组合变化，重载可以把几种公开调用方式分别写清楚；如果参数结构相近、返回值统一，联合类型通常更简单。重载签名对调用者可见，最后的实现签名只是内部承接，不能直接被外部调用。可变参数元组适合表达“参数之间有关联”的函数，但类型复杂度要控制在团队能读懂的范围内。
