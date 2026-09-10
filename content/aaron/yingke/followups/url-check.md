---
id: yingke-followup-url-check
title: 追问：【高频】`urlCheck: false` 是什么？上线后能请求任意域名吗？
aliases: [能讲讲项目中的urlCheck 配置与正式域名限制吗？, 关于urlCheck 配置与正式域名限制，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [追问, urlCheck, 合法域名, HTTPS]
---

# 追问：【高频】`urlCheck: false` 是什么？上线后能请求任意域名吗？

## 核心回答

urlCheck: false 只是关掉开发工具里的域名校验，方便调试。正式发布仍要配置合法的 HTTPS 请求域名，不能请求任意地址，也不能把这个开发配置当成跨域或安全方案。

## 回答要点

- urlCheck: false 只是关掉开发工具里的域名校验，方便调试。
- 正式发布仍要配置合法的 HTTPS 请求域名，不能请求任意地址，也不能把这个开发配置当成跨域或安全方案。

## 面试官可能追问

- 开发工具能访问为什么不能证明发布后可访问？
- 真机验证前需要核对哪些域名配置？

## 代码证据

> **代码依据（不用于口述）**
>
> - [manifest.json 第 52～57 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：微信小程序配置中将 `urlCheck` 设为 false。
