---
id: yingke-followup-appid-secret
title: 追问：项目里的 AppID 能放在前端吗？它是密钥吗？
aliases: [能讲讲项目中的AppID 与 AppSecret 的区别吗？, 关于AppID 与 AppSecret 的区别，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, AppID, AppSecret, 客户端配置]
---

# 追问：项目里的 AppID 能放在前端吗？它是密钥吗？

## 核心回答

AppID 是应用标识，不是 AppSecret，放在客户端配置不等于泄露密钥。真正的 AppSecret、API Secret 和私钥要留在后端或云函数，由服务端发需要凭证的请求。

【小程序包和请求都可能被分析。目前项目有 AppID 配置，没有看到管理 AppSecret 的代码。】

## 回答要点

- AppID 是应用标识，不是 AppSecret，放在客户端配置不等于泄露密钥。
- 小程序包和请求都可能被分析。目前项目有 AppID 配置，没有看到管理 AppSecret 的代码。

## 面试官可能追问

- 哪些应用配置可以公开，哪些必须留在服务端？
- 为什么不能依赖小程序包难以阅读来保密？

## 代码证据

> **代码依据（不用于口述）**
>
> - [manifest.json 第 2～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:2>)：项目基础标识配置。
> - [manifest.json 第 52～57 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：微信小程序 AppID 与本地调试设置。
