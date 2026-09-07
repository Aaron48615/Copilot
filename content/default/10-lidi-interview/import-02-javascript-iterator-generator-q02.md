---
id: lidi-202609-import-02-javascript-iterator-generator-q02
title: for...of 为什么不能直接遍历普通对象？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [迭代器, 生成器, Symbol.iterator, yield]
---

# for...of 为什么不能直接遍历普通对象？

## 核心回答

普通对象默认没有 Symbol.iterator，所以不满足可迭代协议。可以自己实现这个方法，或者用 Object.keys、Object.entries 遍历对象的可枚举属性。两种遍历表达的意图不同，不应该只为了少写几行代码强行转换。
