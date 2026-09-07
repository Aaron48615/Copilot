---
id: lidi-202609-import-02-javascript-iterator-generator-q03
title: 生成器能提前结束吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [迭代器, 生成器, Symbol.iterator, yield]
---

# 生成器能提前结束吗？

## 核心回答

可以调用 `return()` 结束迭代，或者在生成器内部 return。for...of 中途 break 时，如果迭代器提供 return 方法，也会给它清理资源的机会。
