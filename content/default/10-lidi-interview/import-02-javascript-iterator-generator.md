---
id: lidi-202609-import-02-javascript-iterator-generator
title: 迭代器、可迭代对象和生成器有什么关系？
aliases: [Iterator Generator, Symbol.iterator, yield]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [迭代器, 生成器, Symbol.iterator, yield]
---

# 迭代器、可迭代对象和生成器有什么关系？

## 核心回答

可迭代对象是能提供 `Symbol.iterator` 方法的对象，调用这个方法会得到迭代器。迭代器每次调用 `next()` 返回 `{ value, done }`，`for...of` 就是按这个协议不断取值，直到 done 为 true。

生成器函数用 `function*` 声明，里面用 yield 暂停和产出值。它调用后返回一个同时满足迭代器和可迭代对象协议的对象，所以可以直接被 for...of 遍历。它适合表达按需产生数据的过程，不需要一开始把所有结果放进数组。
