---
id: shiguang-followup-ai-key-storage
title: 追问：AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量？
aliases: [能讲讲项目中的AI Key 的存储方案取舍吗？, 关于AI Key 的存储方案取舍，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, AI Key, localStorage, 服务端环境变量]
---

# 追问：AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量？

## 核心回答

练习版主要是方便调试，优先从 localStorage 读取 AI Key、接口地址和模型名，在控制台改一下就能切换，不用重新构建，刷新也还在。但浏览器脚本能读取，直接请求模型时 Key 也会出现在请求头里。

sessionStorage 和内存只是保存时间短一些，Key 仍然到了浏览器；`VITE_` 环境变量也会进入前端产物，不能靠它保密。所以改进版让前端只请求 `/api/ai`，共享 Key 放服务端环境变量，由服务端调用模型。

【HttpOnly Cookie 更适合配合服务端管理用户会话，也不应该拿来向客户端下发共享模型 Key。真实 Key 如果以前进过浏览器或构建文件，还需要检查暴露范围并更换旧 Key。】

## 回答要点

- 练习版主要是方便调试，优先从 localStorage 读取 AI Key、接口地址和模型名，在控制台改一下就能切换，不用重新构建，刷新也还在。
- sessionStorage 和内存只是保存时间短一些，Key 仍然到了浏览器；`VITE_` 环境变量也会进入前端产物，不能靠它保密。
- HttpOnly Cookie 更适合配合服务端管理用户会话，也不应该拿来向客户端下发共享模型 Key。

## 面试官可能追问

- Key 曾经进入前端产物后，仅移动到服务端够吗？
- 用户会话 Cookie 为什么不适合下发平台共享模型 Key？

## 代码证据

> **代码依据（不用于口述）**
> - [练习版配置第 13～38 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:13)：localStorage、`VITE_AI_*` 和默认配置的读取顺序。
> - [练习版请求第 48～63 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:48)：浏览器把 Key 放入上游 Authorization。
> - [改进版客户端第 7～16 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)：浏览器只请求本站 `/api/ai`。
> - [AI 服务端第 141～172 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:141)：服务端读取模型配置和 Key，再调用上游。
> - 原理参考：[MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)、[MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)、[Vite 环境变量](https://vite.dev/guide/env-and-mode)。
