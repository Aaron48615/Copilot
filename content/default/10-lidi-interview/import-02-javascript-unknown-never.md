---
id: lidi-202609-import-02-javascript-unknown-never
title: unknown、any 和 never 应该怎么选？
aliases: [TypeScript unknown any never, 类型安全边界]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [unknown, any, never, 类型收窄]
---

# unknown、any 和 never 应该怎么选？

## 核心回答

外部数据我会先用 `unknown` 接住，因为在确认类型以前不能直接访问它的属性。经过 typeof、in 或自定义类型守卫收窄后，才把它当成具体类型。`any` 是把检查关掉，偶尔用于类型不完整的旧库，但不应该从接口层一路传进业务代码。

`never` 表示不可能出现的值。它常用在一个函数永远抛错或一个可辨识联合已经被穷尽的分支里。`void` 则只是表示调用方不关心返回值，两者不是一回事。
