---
id: yingke-followup-axios-choice
title: 追问：【高频】uni-app 已经有 `uni.request`，为什么还要使用 Axios？
aliases: [能讲讲项目中的uni.request 之外使用 Axios 的取舍吗？, 关于uni.request 之外使用 Axios 的取舍，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, Axios, uni.request, 统一配置]
---

# 追问：【高频】uni-app 已经有 `uni.request`，为什么还要使用 Axios？

## 核心回答

主要是把首页、列表和详情的请求写法统一起来，基础地址、超时和响应处理都放在同一个 Axios 实例里，再写 adapter 调用 uni.request。页面只调用业务 API，不用重复写底层配置。

【项目比较小，自己封装 uni.request 也够用，还能少一个依赖。用 Axios 是方便统一写法，也要考虑多引入依赖的成本。】

## 回答要点

- 主要是把首页、列表和详情的请求写法统一起来，基础地址、超时和响应处理都放在同一个 Axios 实例里，再写 adapter 调用 uni.request。
- 项目比较小，自己封装 uni.request 也够用，还能少一个依赖。

## 面试官可能追问

- 直接封装 uni.request 会少哪些成本？
- 项目扩展后哪些公共配置适合放在请求实例里？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 3～33 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：自定义 adapter，并将它配置到 Axios 实例中。
> - [api/detail.js 第 3～8 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:3>)：业务 API 使用统一实例发起请求。
