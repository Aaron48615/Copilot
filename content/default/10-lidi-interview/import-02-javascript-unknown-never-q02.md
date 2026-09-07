---
id: lidi-202609-import-02-javascript-unknown-never-q02
title: 为什么接口响应不能直接断言成类型？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [unknown, any, never, 类型收窄]
---

# 为什么接口响应不能直接断言成类型？

## 核心回答

`as User` 只是在编译器面前改变说法，不会在运行时检查服务端真的返回了什么。接口字段缺失、类型改变或者网关返回错误 JSON 时，断言仍然会通过。对关键接口，我会用手写守卫或 zod 之类的运行时校验。
