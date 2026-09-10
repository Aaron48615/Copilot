---
id: yingke-normal-axios-adapter
title: 亮点一：用自定义 adapter 连接 Axios 和小程序请求
aliases: [能讲讲项目中的自定义 adapter 连接小程序请求吗？, 关于自定义 adapter 连接小程序请求，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [亮点, Axios, adapter, uni.request]
---

# 亮点一：用自定义 adapter 连接 Axios 和小程序请求

## 核心回答

这块主要是让 Axios 能用小程序的请求能力。我写了 adapter，把 Axios 配置转成 `uni.request` 参数，再把结果整理回 Axios 响应，业务 API 共用一个实例，页面就不用重复写地址、超时和响应处理。

【小程序不能直接照搬浏览器默认请求实现。目前适配了基础字段，但非 2xx 判断、params 序列化和取消还没完整支持。后面会分别测正常请求、断网、超时和 4xx、5xx，检查参数、数据和错误传递。】

## 回答要点

- 这块主要是让 Axios 能用小程序的请求能力。
- 小程序不能直接照搬浏览器默认请求实现。目前适配了基础字段，但非 2xx 判断、params 序列化和取消还没完整支持。

## 面试官可能追问

- HTTP 非 2xx 返回时 adapter 应如何处理？
- 怎样测试超时和断网时错误是否传到页面？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：adapter 的请求参数映射和返回结构转换。
> - [utils/request.js 第 29～59 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：将 adapter 接入 Axios 实例，并统一解包响应数据。
> - [api/detail.js 第 3～8 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:3>)：业务 API 使用统一实例发起详情请求。
