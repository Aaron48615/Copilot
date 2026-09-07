---
id: lidi-202609-import-02-javascript-new-operator
title: new 一个对象时底层发生了什么？
aliases: [手写 new, new 的实现原理, 构造函数实例化]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [new, prototype, constructor, 实例]
---

# new 一个对象时底层发生了什么？

## 核心回答

可以按四步理解：先创建一个新对象，把它的原型指向构造函数的 prototype；再用这个对象作为 this 执行构造函数；最后如果构造函数返回的是对象，就返回那个对象，否则返回刚创建的实例。这样实例既能拿到构造函数里初始化的属性，也能通过原型共享方法。

所以 `new Person('A')` 不是普通函数调用，this、prototype 和返回值都有特殊规则。手写时最容易漏的是“构造函数显式返回对象”的情况，不能无条件返回自己创建的实例。
