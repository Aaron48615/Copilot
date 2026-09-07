---
id: lidi-202609-import-02-javascript-conditional-infer
title: infer 和条件类型应该解决什么问题？
aliases: [TypeScript infer, 条件类型, 类型体操]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, infer, 条件类型, 映射类型]
---

# infer 和条件类型应该解决什么问题？

## 核心回答

条件类型像类型层面的 if，`infer` 可以在匹配某种结构时把其中一部分类型“取出来”，例如提取 Promise 的结果或函数返回值。它适合写通用库和 API 辅助类型，让调用者少写重复类型；业务代码里如果类型已经清楚，就不要为了炫技堆很多嵌套条件，编译错误反而更难读。类型体操要以可维护和编译速度为边界。
