---
id: yingke-normal-platform-upstream-gap
title: 不足七：跨端能力没有实际验证，第三方接口也缺少稳定性保障
aliases: [能讲讲项目中的跨端验证和第三方接口稳定性的不足吗？, 关于跨端验证和第三方接口稳定性的不足，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [不足, 跨端, 第三方接口, 合法域名]
---

# 不足七：跨端能力没有实际验证，第三方接口也缺少稳定性保障

## 核心回答

跨端和第三方接口还没充分验证。项目 UI 依赖 Vant Weapp，数据直接请求第三方接口，换端、域名没配好，或者上游限制访问、改字段，都可能影响功能。

我会先明确主要支持哪个端，配置合法域名并做真机验证。正式使用时，再考虑由自己的服务端请求上游，统一数据格式，补缓存、限流和失败处理。

【代码里用了 uni-app API 和 rpx，也关闭了开发时的 URL 校验，但这些不能说明已经多端发布或线上一直稳定。】

## 回答要点

- 跨端和第三方接口还没充分验证。项目 UI 依赖 Vant Weapp，数据直接请求第三方接口，换端、域名没配好，或者上游限制访问、改字段，都可能影响功能。
- 我会先明确主要支持哪个端，配置合法域名并做真机验证。
- 代码里用了 uni-app API 和 rpx，也关闭了开发时的 URL 校验，但这些不能说明已经多端发布或线上一直稳定。

## 面试官可能追问

- Vant Weapp 会对其他端适配带来什么约束？
- 第三方接口字段变化时哪一层适合统一处理？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 29～33 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：客户端直接配置第三方移动端基础地址。
> - [manifest.json 第 52～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：微信小程序设置、其他平台组件开关及 Vue 2 配置。
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：业务页面依赖 Vant Weapp 组件。
