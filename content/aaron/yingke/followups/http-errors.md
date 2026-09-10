---
id: yingke-followup-http-errors
title: 追问：HTTP 404、500 会进入响应错误拦截器吗？
aliases: [能讲讲项目中的404 和 500 的错误处理路径吗？, 关于404 和 500 的错误处理路径，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [追问, statusCode, resolve, HTTP 错误]
---

# 追问：HTTP 404、500 会进入响应错误拦截器吗？

## 核心回答

按现在的写法，不能保证。uni.request 进入 success 不代表一定是 2xx，但 adapter 没看 statusCode 就 resolve 了，所以 404、500 也可能走成功处理。

我会在 adapter 补 HTTP 状态判断，再区分网络、HTTP 和业务错误。即使返回 200，也仍然要检查业务数据。

## 回答要点

- 按现在的写法，不能保证。uni.request 进入 success 不代表一定是 2xx，但 adapter 没看 statusCode 就 resolve 了，所以 404、500 也可能走成功处理。
- 我会在 adapter 补 HTTP 状态判断，再区分网络、HTTP 和业务错误。

## 面试官可能追问

- uni.request 的 success 与 HTTP 2xx 有什么区别？
- 补状态判断后如何验证错误能传到 catch？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：success 回调不检查 `statusCode` 就直接 resolve。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应拦截器没有业务状态判断。
