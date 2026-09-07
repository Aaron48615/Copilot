---
id: lidi-202609-import-02-javascript-tsconfig-strict
title: tsconfig 里的 strict 对项目有什么影响？
aliases: [TypeScript strict, noImplicitAny, strictNullChecks]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tsconfig, strict, strictNullChecks, noImplicitAny]
---

# tsconfig 里的 strict 对项目有什么影响？

## 核心回答

`strict` 会打开一组更严格的检查，最常见的体感是不能隐式使用 any、null 和 undefined 不能随便当成普通值。刚打开时会出现不少错误，但这些错误通常是在提醒接口边界和空值分支没有写清楚。

我会先解决真实的类型问题，不会一上来满项目加 `as`。比如一个请求可能返回空数据，就把类型写成 `User | null`，在使用前判断；一个参数来源不可信，就从 unknown 开始收窄。这样 strict 才真正起到约束作用。
