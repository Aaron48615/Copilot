---
id: lidi-202609-import-02-javascript-new-operator-q01
title: 箭头函数能用 new 吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [new, prototype, constructor, 实例]
---

# 箭头函数能用 new 吗？

## 核心回答

不能。箭头函数没有自己的 this，也没有 prototype，JavaScript 会把它视为不可构造函数。普通函数、class 或者明确实现了构造能力的函数才可以被 new。
