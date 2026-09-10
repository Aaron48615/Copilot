---
id: yingke-normal-verify-errors
title: 接口结果和错误状态
aliases: [能讲讲项目中的接口结果和错误状态的验证吗？, 关于接口结果和错误状态的验证，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [HTTP 状态, 业务字段, 空数据]
---

# 接口结果和错误状态

## 核心回答

除了 HTTP 状态，我还会核对地址、方法、分页参数、业务字段和页面结果。断网、404、500、200 但缺字段、空列表，还有详情没 pic 都要试，确认页面能分清正常、空数据和请求失败。

【目前请求层还没区分这些错误，页面也缺少 catch 和错误提示，所以需要补实现，再验证，不能继续读取不存在的字段。】

## 回答要点

- 除了 HTTP 状态，我还会核对地址、方法、分页参数、业务字段和页面结果。
- 目前请求层还没区分这些错误，页面也缺少 catch 和错误提示，所以需要补实现，再验证，不能继续读取不存在的字段。

## 面试官可能追问

- HTTP 200 但详情没有 pic 时应怎样展示？
- 如何判断错误有没有被错误地当作成功数据？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：当前请求成功、失败的判定入口。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：当前响应解包和异常传递逻辑。
> - [pages/detail/index.vue 第 1～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：返回字段缺失时可能受影响的详情模板。
