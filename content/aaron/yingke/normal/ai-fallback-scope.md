---
id: yingke-normal-ai-fallback-scope
title: AI 降级
aliases: [能讲讲项目中的当前项目的 AI 降级范围吗？, 关于当前项目的 AI 降级范围，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [AI 降级, 未接入, 后续方案]
---

# AI 降级

## 核心回答

这个项目没有接 AI，也没有 AI Key、流式生成或降级代码，所以目前没有这部分可以验证。

【以后加 AI 推荐或简介生成，再考虑超时、限流、空内容和不可用时回退普通影视数据，模型 Key 放服务端。这些都是后续设想。】

## 回答要点

- 这个项目没有接 AI，也没有 AI Key、流式生成或降级代码，所以目前没有这部分可以验证。
- 以后加 AI 推荐或简介生成，再考虑超时、限流、空内容和不可用时回退普通影视数据，模型 Key 放服务端。

## 面试官可能追问

- 如果未来增加 AI 简介，失败时如何保留普通影视内容？
- 未来的模型 Key 应放在哪一端？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：现有业务依赖只有 UI 和请求相关库，没有 AI SDK。
> - [pages.json 第 2～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:2>)：现有业务路由只有首页、列表和详情。
