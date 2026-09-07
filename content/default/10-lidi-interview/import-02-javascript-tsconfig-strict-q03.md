---
id: lidi-202609-import-02-javascript-tsconfig-strict-q03
title: 什么时候可以用类型断言？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tsconfig, strict, strictNullChecks, noImplicitAny]
---

# 什么时候可以用类型断言？

## 核心回答

我只在边界已经被其他方式保证、而 TypeScript 无法推断时用断言，比如 DOM 查询后确认元素存在。外部 API、用户输入和权限判断不能只靠断言。
