---
id: lidi-202609-javascript-core-q01
title: `var`、`let` 和 `const` 有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# `var`、`let` 和 `const` 有什么区别？

## 核心回答

1. `var` 是函数作用域，允许重复声明，存在变量提升。代码比较大时，变量可能在不知情的情况下被覆盖。
2. `let` 和 `const` 是块级作用域，不能在同一个作用域重复声明。`let` 可以重新赋值，`const` 不能重新绑定。
3. `const` 不能重新赋值，不代表对象内容完全不能改变。比如 `const user = { name: 'a' }`，仍然可以修改 `user.name`，只是不能让 `user` 指向另一个对象。
4. 我平时默认使用 `const`，确实需要重新赋值时用 `let`，不再使用 `var` 写新的业务代码。

