---
id: lidi-202609-import-02-javascript-instanceof-prototype
title: instanceof 怎样沿原型链判断？
aliases: [手写 instanceof, 原型链, Object.create]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [instanceof, prototype, 原型链, Object.create]
---

# instanceof 怎样沿原型链判断？

## 核心回答

`value instanceof Ctor` 会从 value 的内部原型开始，逐级比较是否等于 `Ctor.prototype`，直到原型为 null。它判断的是原型链关系，不是对象“来自哪个文件”或 JSON 里写了什么。一个简化实现就是先处理 null 和非函数，再循环 `Object.getPrototypeOf`。跨 iframe、Symbol.hasInstance 和修改 prototype 时要说明结果可能和直觉不同。
