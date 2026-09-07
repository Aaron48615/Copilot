---
id: lidi-202609-javascript-core-q03
title: `this` 的指向怎么判断？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# `this` 的指向怎么判断？

## 核心回答

1. 普通函数里的 `this` 主要看调用方式，不是看函数写在哪里。用对象方法调用时通常指向调用它的对象，直接调用时在严格模式下是 `undefined`。
2. `call`、`apply` 和 `bind` 可以显式指定 `this`，区别主要在于参数传递方式和是否立即执行。
3. 箭头函数没有自己的 `this`，它会使用定义位置外层作用域的 `this`，也不能通过 `call` 或 `bind` 改变。
4. 在 React 或 Vue 代码中，我更常用函数和箭头函数，遇到回调丢失上下文的问题，会先检查函数是不是被当成普通函数调用了。

