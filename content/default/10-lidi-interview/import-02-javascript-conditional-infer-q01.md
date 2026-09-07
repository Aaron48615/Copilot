---
id: lidi-202609-import-02-javascript-conditional-infer-q01
title: 分布式条件类型是什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, infer, 条件类型, 映射类型]
---

# 分布式条件类型是什么？

## 核心回答

当条件类型左侧是裸类型参数时，联合类型会逐成员分发，所以 `T extends U ? A : B` 作用在 `A | B` 上可能得到多个结果。把参数包在元组里可以关闭分发。遇到结果不符合预期，我会先把中间类型写出来，再判断是不是分发导致，而不是马上加一堆断言。
