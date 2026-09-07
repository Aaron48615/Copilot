---
id: lidi-202609-import-08-coding-deep-clone
title: 深拷贝题怎样说明能力边界？
aliases: [手写深拷贝, structuredClone, 循环引用]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [深拷贝, 循环引用, structuredClone]
---

# 深拷贝题怎样说明能力边界？

## 核心回答

先问清楚数据范围：如果是普通 JSON 数据，我会直接使用 `structuredClone` 或明确的递归实现；不要默认 `JSON.parse(JSON.stringify())`，因为它会丢 undefined、函数、特殊对象，还会在循环引用时失败。递归版本要用 WeakMap 记录已经复制的对象，处理数组、Date、Map、Set 等类型，并说明函数、DOM 节点和自定义类实例是否支持。

