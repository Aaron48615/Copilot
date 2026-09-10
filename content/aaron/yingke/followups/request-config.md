---
id: yingke-followup-request-config
title: 追问：为什么 `baseURL` 和超时时间写在请求文件里？
aliases: [能讲讲项目中的baseURL 与超时的集中配置吗？, 关于baseURL 与超时的集中配置，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, baseURL, 超时, 环境配置]
---

# 追问：为什么 `baseURL` 和超时时间写在请求文件里？

## 核心回答

这样可以少写重复配置，改地址或超时只改一个地方。现在 baseURL 配的是豆瓣移动端地址，超时 5 秒。

【目前地址写死了，切换开发、测试和生产环境不方便，后面可以放环境配置。但服务端密钥不能跟着环境变量打包进前端，客户端里的内容仍可能被看到。】

## 回答要点

- 这样可以少写重复配置，改地址或超时只改一个地方。
- 目前地址写死了，切换开发、测试和生产环境不方便，后面可以放环境配置。

## 面试官可能追问

- 开发和生产接口不同应该怎样管理配置？
- 哪些配置不应进入客户端构建产物？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 29～33 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：集中配置第三方基础地址、5 秒超时和 adapter。
