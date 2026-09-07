---
id: lidi-202609-import-02-javascript-type-checking-q01
title: 接口数据能只靠 TypeScript 类型保证吗？
aliases: []
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [typeof, instanceof, Object.prototype.toString, Array.isArray]
---

# 接口数据能只靠 TypeScript 类型保证吗？

## 核心回答

不能。TypeScript 类型在编译后会被移除，接口实际返回什么还得在运行时检查。可以先用 unknown 接住，再判断必要字段的类型，或者使用运行时校验工具。
