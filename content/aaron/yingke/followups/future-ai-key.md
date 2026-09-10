---
id: yingke-followup-future-ai-key
title: 追问：如果以后接入 AI Key，应该存在哪里？
aliases: [能讲讲项目中的未来 AI Key 的保存方案吗？, 关于未来 AI Key 的保存方案，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, AI Key, 云函数, 用户额度]
---

# 追问：如果以后接入 AI Key，应该存在哪里？

## 核心回答

以后接入的话，我会把 AI Key 放后端或云函数，前端请求自己的业务接口，由后端调用模型，再补用户身份检查、额度限制，日志也不记录敏感值。

【Key 不能放 localStorage、小程序 Storage、源码或会打包到前端的环境变量里。这个项目目前没有 AI SDK、Key 或 AI 功能，以上是后续方案。】

## 回答要点

- 以后接入的话，我会把 AI Key 放后端或云函数，前端请求自己的业务接口，由后端调用模型，再补用户身份检查、额度限制，日志也不记录敏感值。
- Key 不能放 localStorage、小程序 Storage、源码或会打包到前端的环境变量里。

## 面试官可能追问

- 服务端保存 Key 后还需要怎样限制接口用量？
- 日志中哪些模型请求信息不应该直接输出？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：现有依赖只有 UI 和请求相关库，没有 AI SDK。
> - [pages.json 第 2～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:2>)：现有业务页面只有首页、列表和详情。
