---
id: lidi-202609-import-02-javascript-this-binding
title: 普通函数、箭头函数和类方法的 this 怎么判断？
aliases: [this 指向, 箭头函数 this, bind call apply]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [this, 箭头函数, bind, call, apply]
---

# 普通函数、箭头函数和类方法的 this 怎么判断？

## 核心回答

普通函数的 this 看调用方式：`obj.fn()` 通常是 obj，直接调用在严格模式下是 undefined，`call/apply/bind` 可以显式指定；用 `new` 调用时 this 是新对象。箭头函数没有自己的 this，它捕获定义位置的外层 this，也不能被 call 或 bind 改掉。类方法本质上仍是普通函数，脱离实例调用时需要手动绑定或用箭头属性。
