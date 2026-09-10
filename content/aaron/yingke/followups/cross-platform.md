---
id: yingke-followup-cross-platform
title: 追问：【高频】这个项目真的支持多端吗？
aliases: [能讲讲项目中的项目跨端支持的实际范围吗？, 关于项目跨端支持的实际范围，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, uni-app, Vant Weapp, 跨端验证]
---

# 追问：【高频】这个项目真的支持多端吗？

## 核心回答

现在不能说所有端都支持，更适合说是用 uni-app 做的微信小程序。请求和 rpx 有跨端基础，但 UI 用了 Vant Weapp，模板也混着 div、span、img 和小程序组件，我没有各端实际构建、运行的结果。

【要支持其他端，需要分别构建并检查组件、样式和平台 API。】

## 回答要点

- 现在不能说所有端都支持，更适合说是用 uni-app 做的微信小程序。
- 要支持其他端，需要分别构建并检查组件、样式和平台 API。

## 面试官可能追问

- 支持其他端前为什么要分别构建和运行？
- 哪些模板和组件写法需要优先核对平台兼容性？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 3～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：底层请求使用 uni-app API。
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：业务全局注册 Vant Weapp 组件。
> - [manifest.json 第 52～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：包含微信小程序及其他平台配置，但不能证明均已运行验证。
