---
id: lidi-202609-import-02-javascript-generic-api
title: 泛型在前端 API 封装里怎么用？
aliases: [TypeScript 泛型请求, 泛型函数, API 响应类型]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [泛型, API, Promise, response, TypeScript]
---

# 泛型在前端 API 封装里怎么用？

## 核心回答

如果请求外壳固定，里面的 data 由接口决定，就可以把 data 写成泛型。比如 `request<T>()` 返回 `Promise<ApiResponse<T>>`，商品列表传 Product[]，用户详情传 User。这样公共请求逻辑只写一份，调用处仍然有准确的提示。

泛型解决的是类型复用，不会替我验证服务器数据。T 是调用方对响应的约定，真正不可信的输入仍要先做运行时校验。类型参数太复杂时，我宁愿拆成几个清楚的类型，也不写一行看不懂的类型体操。
