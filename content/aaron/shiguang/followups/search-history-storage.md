---
id: shiguang-followup-search-history-storage
title: 追问：搜索历史为什么放 localStorage
aliases: [能讲讲项目中的搜索历史选择 localStorage 的原因吗？, 关于搜索历史选择 localStorage 的原因，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, localStorage, 搜索历史, JSON]
---

# 追问：搜索历史为什么放 localStorage

## 核心回答

搜索历史是为了下次打开这个浏览器时，还能看到最近搜过什么，所以练习版放在 localStorage 里。保存前去重，最多留最近 10 条，再用 `JSON.stringify` 转成字符串，读取时用 `JSON.parse` 还原。

【它不参与登录、计价或下单。现在还没有按账号区分，换账号可能读到同一份历史，解析坏数据时也缺少异常处理。以后要跨设备同步，就得跟用户关联，存到服务端。】

## 回答要点

- 搜索历史是为了下次打开这个浏览器时，还能看到最近搜过什么，所以练习版放在 localStorage 里。
- 它不参与登录、计价或下单。现在还没有按账号区分，换账号可能读到同一份历史，解析坏数据时也缺少异常处理。

## 面试官可能追问

- 存储内容不是合法 JSON 时页面应该怎么办？
- 跨账号或跨设备同步搜索历史需要哪些变化？

## 代码证据

> **代码依据（不用于口述）**
> - [练习版 AI 配置第 13～38 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:13)：读取浏览器 AI 配置和手动配置提示。
> - [练习版 Token 第 1～10 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/utils/auth.ts:1)：Token 的写入、读取和删除。
> - [练习版搜索第 171～238 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/views/Search.vue:171)：搜索历史读取、去重、截取、删除和清空。
> - [练习版立即购买第 316 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/views/ProdInfo.vue:316)、[确认页第 109 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/views/Order.vue:109)：确认订单参数使用 sessionStorage。
