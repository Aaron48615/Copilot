---
id: lidi-202609-import-02-javascript-structured-clone
title: structuredClone 能复制什么，不能复制什么？
aliases: [结构化克隆, 深拷贝边界, structuredClone]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [structuredClone, 深拷贝, Transferable]
---

# structuredClone 能复制什么，不能复制什么？

## 核心回答

structuredClone 按结构化克隆算法复制很多内建类型，例如对象、数组、Date、Map、Set、Blob 和部分 TypedArray，也能处理循环引用；传 Transferable 时还可以把 ArrayBuffer 的所有权转移。函数、DOM 节点、WeakMap、带不可克隆字段的对象不能直接复制，原型和类实例语义也不能简单等同于“完整复制”。所以使用前先确认数据契约，不要把它当成万能深拷贝。
