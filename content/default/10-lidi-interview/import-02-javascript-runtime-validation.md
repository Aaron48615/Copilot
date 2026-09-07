---
id: lidi-202609-import-02-javascript-runtime-validation
title: TypeScript 项目为什么还需要运行时校验？
aliases: [接口数据校验, zod, unknown 响应]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [运行时校验, zod, unknown, API]
---

# TypeScript 项目为什么还需要运行时校验？

## 核心回答

TypeScript 只在构建时检查源码，接口返回的数据在运行时才真正进来，类型信息不会跟着请求传输。所以我会把外部输入，包括 API、localStorage、URL 参数和用户上传的 JSON，先当成 unknown，再做必要校验。

校验可以手写，也可以用 zod 这类 schema 工具。关键不是工具名字，而是校验失败以后有明确的处理：显示错误、使用安全默认值，或者停止这次操作，不能继续拿坏数据渲染页面。
