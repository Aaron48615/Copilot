---
id: lidi-202609-import-02-javascript-generic-api-q02
title: 分页响应怎么写？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [泛型, API, Promise, response, TypeScript]
---

# 分页响应怎么写？

## 核心回答

把列表项和分页信息分开：`PageResult<T> = { records: T[]; page: number; pageSize: number; total: number }`。接口只要替换 T 就能复用。空列表、最后一页和 total 不可信时，页面仍要有自己的边界处理。
