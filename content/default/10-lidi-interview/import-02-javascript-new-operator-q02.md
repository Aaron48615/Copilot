---
id: lidi-202609-import-02-javascript-new-operator-q02
title: class 和手写构造函数有什么关系？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [new, prototype, constructor, 实例]
---

# class 和手写构造函数有什么关系？

## 核心回答

class 提供了更清楚的语法，实例方法仍然放在 prototype 上，extends 也建立在原型链上。class 的构造调用必须使用 new，而普通函数既可以直接调用，也可能被当成构造函数，class 在这里更不容易误用。
