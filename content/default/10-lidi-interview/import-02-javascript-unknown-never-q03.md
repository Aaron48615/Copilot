---
id: lidi-202609-import-02-javascript-unknown-never-q03
title: never 在 switch 里怎么用？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [unknown, any, never, 类型收窄]
---

# never 在 switch 里怎么用？

## 核心回答

对联合类型的每个成员处理完以后，把剩余值传给 `assertNever(value: never)`。以后有人新增一个联合成员却忘了补分支，编译器会在这里报错，能避免状态悄悄落到默认分支。
