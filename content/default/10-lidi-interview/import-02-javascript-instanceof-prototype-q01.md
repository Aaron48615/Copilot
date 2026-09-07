---
id: lidi-202609-import-02-javascript-instanceof-prototype-q01
title: Object.create 和 class extends 是什么关系？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [instanceof, prototype, 原型链, Object.create]
---

# Object.create 和 class extends 是什么关系？

## 核心回答

`Object.create(proto)` 直接创建一个以 proto 为原型的对象；构造函数的 `new` 也会把实例原型连到 `Ctor.prototype`，再执行构造函数；`class extends` 会建立子类构造函数和原型对象之间的两条继承链。它们都依赖原型查找，但 class 还带有方法、super 和严格模式等语义。
