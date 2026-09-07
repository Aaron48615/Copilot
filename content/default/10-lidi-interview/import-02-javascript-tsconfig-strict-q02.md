---
id: lidi-202609-import-02-javascript-tsconfig-strict-q02
title: noUncheckedIndexedAccess 会带来什么变化？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tsconfig, strict, strictNullChecks, noImplicitAny]
---

# noUncheckedIndexedAccess 会带来什么变化？

## 核心回答

用下标取数组或对象时，结果会带上 undefined。它逼着我处理越界和不存在的 key，适合数据来源不稳定的项目。对确实已经检查过的场景，可以用 if 收窄，而不是到处写非空断言。
