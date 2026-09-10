---
id: yingke-followup-adapter-coverage
title: 追问：【高频】这个自定义 adapter 是完整实现吗？
aliases: [能讲讲项目中的自定义 adapter 的实现范围吗？, 关于自定义 adapter 的实现范围，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [追问, adapter, params, 取消请求]
---

# 追问：【高频】这个自定义 adapter 是完整实现吗？

## 核心回答

还不完整，主要满足当前基础 GET 请求。方法、URL、请求体、请求头、超时和成功失败回调已经接上，但 params 序列化、取消、上传下载进度、responseType 和 HTTP 状态判断没有完整支持。

【现在分页直接把 start、count 拼到 URL 里，绕开了 params 的问题，所以还不能把这个 adapter 当成通用请求框架。】

## 回答要点

- 还不完整，主要满足当前基础 GET 请求。方法、URL、请求体、请求头、超时和成功失败回调已经接上，但 params 序列化、取消、上传下载进度、responseType 和 HTTP 状态判断没有完整支持。
- 现在分页直接把 start、count 拼到 URL 里，绕开了 params 的问题，所以还不能把这个 adapter 当成通用请求框架。

## 面试官可能追问

- 分页改成 params 参数后当前实现会有什么问题？
- 通用适配器还应该测试哪些响应类型？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：当前 adapter 实际映射的字段和回调。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：分页参数直接拼接在 URL 中。
