---
id: yingke-followup-console-logs
title: 追问：为什么代码里保留了大量 `console.log`？
aliases: [能讲讲项目中的开发日志的保留与发布处理吗？, 关于开发日志的保留与发布处理，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, console.log, 日志级别, 敏感信息]
---

# 追问：为什么代码里保留了大量 `console.log`？

## 核心回答

这些看起来是开发时留下的日志，列表、详情、组件和生命周期里都有。开发时方便看参数和数据，但发布前应该清掉，或者用日志工具按环境和级别控制。

【现在没有登录和敏感用户数据，但无用日志多了会影响排查。以后涉及 Token、用户信息或完整敏感响应，也不能直接打印。】

## 回答要点

- 这些看起来是开发时留下的日志，列表、详情、组件和生命周期里都有。
- 现在没有登录和敏感用户数据，但无用日志多了会影响排查。

## 面试官可能追问

- 清理日志后怎样保留必要的错误定位信息？
- 如果后来接入登录，哪些响应内容不能完整打印？

## 代码证据

> **代码依据（不用于口述）**
>
> - [App.vue 第 1～11 行](</Users/aaron/CodingPractice/14_uniapp/project2/App.vue:1>)：应用生命周期保留调试日志。
> - [pages/list/index.vue 第 69～83 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:69>)：列表数据和路由参数保留调试日志。
> - [pages/detail/index.vue 第 25～31 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:25>)：详情结果保留调试日志。
> - [components/listContent.vue 第 40～42 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:40>)：组件创建时输出 props。
