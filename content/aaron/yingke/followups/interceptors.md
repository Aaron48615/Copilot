---
id: yingke-followup-interceptors
title: 追问：【高频】请求拦截器和响应拦截器分别做了什么？
aliases: [能讲讲项目中的请求和响应拦截器的实际职责吗？, 关于请求和响应拦截器的实际职责，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, 请求拦截器, response.data, 错误传播]
---

# 追问：【高频】请求拦截器和响应拦截器分别做了什么？

## 核心回答

请求拦截器目前只是原样返回配置，还没加 Token 或公共参数。响应拦截器取出 response.data，让页面直接拿业务数据，已经产生的错误再往上传。

【现在主要统一了调用方式，Token 刷新、自动重试、业务码判断和全局错误提示都还没做。】

## 回答要点

- 请求拦截器目前只是原样返回配置，还没加 Token 或公共参数。
- 现在主要统一了调用方式，Token 刷新、自动重试、业务码判断和全局错误提示都还没做。

## 面试官可能追问

- 没有 HTTP 状态判断时响应错误拦截器能补救吗？
- 如果加入业务码处理，应怎样避免页面重复判断？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 35～45 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:35>)：请求拦截器只透传配置和错误。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应拦截器解包 `response.data` 并继续抛出错误。
