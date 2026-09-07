---
id: lidi-202609-import-08-coding-array-object-utils
title: flatten、groupBy、去重和分页题怎么讲取舍？
aliases: [手写 flatten, groupBy, 数组去重, 分页]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [flatten, groupBy, 去重, 分页]
---

# flatten、groupBy、去重和分页题怎么讲取舍？

## 核心回答

我会先确认是否允许修改原数组、深度规则、空值处理和稳定顺序。flatten 可以用显式栈避免深递归；groupBy 用 Map 按 key 收集；按字段去重也用 Map 保留第一次或最后一次；分页则明确 page 从 0 还是 1 开始，并对负数、pageSize 和超出范围做约定。代码短不代表边界自动正确，先把契约说清楚比背一行 reduce 更重要。

