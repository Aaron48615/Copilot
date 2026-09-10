---
id: yingke-normal-request-wrapper
title: 请求层封装
aliases: [能讲讲项目中的影视请求层的封装吗？, 关于影视请求层的封装，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [Axios, adapter, uni.request]
---

# 请求层封装

## 核心回答

我先建了一个 Axios 实例，再写 adapter，把请求方法、基础地址、路径、请求体、请求头和超时转成 `uni.request` 的参数。返回后先整理成 Axios 响应，再由响应拦截器取出 `response.data`。

首页、列表和详情的 API 都共用这个实例，页面按 Promise 调用，基础配置和响应处理就不用重复写。

【目前请求拦截器只是原样返回配置，没有 Token 或公共参数。params、取消请求和 HTTP 异常状态也没补完整，这层封装主要满足现有基础请求。】

## 回答要点

- 我先建了一个 Axios 实例，再写 adapter，把请求方法、基础地址、路径、请求体、请求头和超时转成 `uni.request` 的参数。
- 首页、列表和详情的 API 都共用这个实例，页面按 Promise 调用，基础配置和响应处理就不用重复写。
- 目前请求拦截器只是原样返回配置，没有 Token 或公共参数。

## 面试官可能追问

- 分页使用 params 时当前 adapter 能否正确处理？
- HTTP 异常状态应在哪一层转换成错误？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：把 Axios 配置转换为 `uni.request`，并整理成功、失败结果。
> - [utils/request.js 第 29～59 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：配置基础地址、5 秒超时以及请求、响应拦截器。
> - [api/user.js 第 1～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:1>)：首页三个分类通过统一实例请求。
> - [api/list.js 第 1～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:1>)：列表页三个分页接口通过统一实例请求。
> - [api/detail.js 第 1～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:1>)：详情接口通过统一实例请求。
