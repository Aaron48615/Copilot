---
id: lidi-202609-import-02-javascript-discriminated-union
title: 如何用可辨识联合描述请求状态？
aliases: [联合类型状态机, TypeScript 请求状态, discriminated union]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [联合类型, 状态机, loading, error, TypeScript]
---

# 如何用可辨识联合描述请求状态？

## 核心回答

我会给每种状态一个字面量字段，比如 `status: 'idle' | 'loading' | 'success' | 'error'`。success 状态才带 data，error 状态才带 message。渲染时先判断 status，TypeScript 就能知道当前分支一定有对应字段，避免 data、error、loading 三个字段互相矛盾。

这比写成一堆可选字段更可靠。后者可能出现 `loading: false` 但 data 和 error 都没有的状态，而联合类型会逼着我把状态变化写完整。
