---
id: lidi-202609-import-08-coding-array-object-utils-q01
title: 为什么不全用 reduce？
aliases: []
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [flatten, groupBy, 去重, 分页]
---

# 为什么不全用 reduce？

## 核心回答

reduce 能写得很紧凑，但遇到异步、早停、深度遍历或多个状态时，可读性和调试性会变差。面试里我会选能清楚表达不变量的循环或栈，必要时再说明等价的函数式写法。性能上关注是否重复扫描、是否创建过多临时数组，而不是盲目追求一行代码。

