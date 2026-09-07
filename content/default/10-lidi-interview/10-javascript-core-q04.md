---
id: lidi-202609-javascript-core-q04
title: `==` 和 `===` 有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# `==` 和 `===` 有什么区别？

## 核心回答

1. `===` 会同时比较类型和值，不会自动做类型转换。`==` 在比较前可能做隐式类型转换，所以结果有时不直观。
2. 业务代码中我优先使用 `===`，这样类型错误更早暴露，也更容易读懂。
3. `== null` 有一个常见用法，可以同时判断 `null` 和 `undefined`，但团队如果有统一的 ESLint 规则，我会以团队规范为准。
4. 比较表单输入、接口返回和数字时，我会先明确数据类型，不依赖隐式转换。

