---
id: lidi-202609-import-02-javascript-new-operator-q03
title: 构造函数返回基本类型会怎样？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [new, prototype, constructor, 实例]
---

# 构造函数返回基本类型会怎样？

## 核心回答

基本类型会被忽略，仍然返回新建的实例。只有显式返回对象或函数时，才会替换默认实例。这也是手写 new 时需要用 `typeof result === 'object' && result !== null || typeof result === 'function'` 判断的原因。
