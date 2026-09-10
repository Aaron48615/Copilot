---
id: yingke-followup-verify-adapter
title: 追问：怎样验证请求封装？
aliases: [能讲讲项目中的请求封装的验证方法吗？, 关于请求封装的验证方法，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [追问, HTTP 状态, 请求参数, 错误传播]
---

# 追问：怎样验证请求封装？

## 核心回答

我会先检查正常请求的方法、完整 URL、分页参数、请求头、超时和 response.data，再试断网、超时、404、500、200 但业务出错以及缺字段。

除了看 Network，还要看错误有没有到正确分支，页面有没有把错误数据继续展示。

【目前没有这些自动化测试，这次也没执行，这是准备采用的验证方法。】

## 回答要点

- 我会先检查正常请求的方法、完整 URL、分页参数、请求头、超时和 response.data，再试断网、超时、404、500、200 但业务出错以及缺字段。
- 除了看 Network，还要看错误有没有到正确分支，页面有没有把错误数据继续展示。
- 目前没有这些自动化测试，这次也没执行，这是准备采用的验证方法。

## 面试官可能追问

- HTTP 200 但业务失败应该落到什么处理分支？
- 怎样验证超时参数真正传到了 uni.request？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：请求配置映射和网络回调是主要验证对象。
> - [utils/request.js 第 29～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：实例配置和拦截器是响应验证对象。
