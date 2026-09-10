---
id: yingke-normal-error-layering-gap
title: 不足一：请求成功与业务成功没有分层判断
aliases: [能讲讲项目中的请求与业务成功分层判断的缺口吗？, 关于请求与业务成功分层判断的缺口，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [不足, HTTP 状态, 业务码, 错误分层]
---

# 不足一：请求成功与业务成功没有分层判断

## 核心回答

请求层现在只要进 uni.request 的 success 就 resolve，再取出 response.data。这样 404、500 或 HTTP 200 里的业务错误，都可能被页面当成正常数据，后面读字段就容易出问题。

我会先在 adapter 判断 HTTP 状态，再按接口约定判断业务结果，把网络、HTTP 和业务错误统一整理后交给页面。现在统一了入口，异常处理还要补。

## 回答要点

- 请求层现在只要进 uni.request 的 success 就 resolve，再取出 response.data。
- 我会先在 adapter 判断 HTTP 状态，再按接口约定判断业务结果，把网络、HTTP 和业务错误统一整理后交给页面。

## 面试官可能追问

- HTTP 200 但字段缺失属于什么问题？
- 页面怎样区分网络错误和业务拒绝？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：success 回调没有根据 `statusCode` 决定 reject。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应层没有业务状态码判断。
