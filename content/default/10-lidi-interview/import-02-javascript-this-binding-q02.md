---
id: lidi-202609-import-02-javascript-this-binding-q02
title: bind 之后还能被 new 覆盖吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [this, 箭头函数, bind, call, apply]
---

# bind 之后还能被 new 覆盖吗？

## 核心回答

绑定函数用 new 调用时，new 的实例优先级高于 bind 绑定的 this，但预设参数仍然保留。实际使用中我会避免同时混用两种语义，手写题则用一个带原型的构造函数例子验证。关键是区分“绑定 this”和“部分应用参数”是两个效果。
