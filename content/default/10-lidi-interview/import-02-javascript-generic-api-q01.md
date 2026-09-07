---
id: lidi-202609-import-02-javascript-generic-api-q01
title: 泛型约束什么时候需要？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [泛型, API, Promise, response, TypeScript]
---

# 泛型约束什么时候需要？

## 核心回答

当函数要读取类型上的某个字段时，就给 T 加约束，比如 `T extends { id: string }`。没有约束时，泛型函数不能假设 T 一定有 id。约束应该表达真实需求，不能为了消除报错随便写成 `any`。
