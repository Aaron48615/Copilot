---
id: yunshu-followup-deployment-version
title: 追问：项目已经上线，能否说明当前代码就是线上版本？
aliases: [能讲讲项目中的上线信息与当前代码版本的关系吗？, 关于上线信息与当前代码版本的关系，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, 部署记录, 构建版本, 环境变量]
---

# 追问：项目已经上线，能否说明当前代码就是线上版本？

## 核心回答

只能确认仓库里配了 Vercel 重写、SPA 回退、Vite 代理和环境变量注入。项目有已经上线的信息，但这次没核对线上构建、部署记录和环境变量，所以还不能说当前本地版本已经在线上验证过。

## 回答要点

- 只能确认仓库里配了 Vercel 重写、SPA 回退、Vite 代理和环境变量注入。
- 项目有已经上线的信息，但这次没核对线上构建、部署记录和环境变量，所以还不能说当前本地版本已经在线上验证过。

## 面试官可能追问

- 怎样把线上产物对应到某个提交或构建？
- 环境变量不同为什么可能让同一份代码表现不同？

## 代码证据

> **代码依据（不用于口述）**
>
> - [vite.config.ts，第 32～61 行](/Users/aaron/personal-hub/apps/project-1/vite.config.ts:32)：开发代理与构建时高德配置。
> - [vercel.json，第 2～10 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：部署重写和 SPA 回退规则。
