---
id: yunshu-followup-https-proxy
title: 追问：网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么？
aliases: [能讲讲项目中的HTTPS 页面与代理上游的安全边界吗？, 关于HTTPS 页面与代理上游的安全边界，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, HTTPS, 代理, TLS]
---

# 追问：网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么？

## 核心回答

不能只看地址栏。浏览器请求本站 /api，平台再转发给上游，当前上游是 HTTP，所以浏览器到平台用了 HTTPS，也不代表后半段有 TLS 保护。

代理主要统一接口前缀、让浏览器同源访问，不会自动加密上游。我会先让上游支持可信的 HTTPS，再检查整条链路。

【开发用 Vite proxy，部署用 rewrite，前端子页面回退到 index.html。代理也不等于接口鉴权安全，额外写前端 AES 不能代替 HTTPS。】

## 回答要点

- 不能只看地址栏。浏览器请求本站 /api，平台再转发给上游，当前上游是 HTTP，所以浏览器到平台用了 HTTPS，也不代表后半段有 TLS 保护。
- 代理主要统一接口前缀、让浏览器同源访问，不会自动加密上游。
- 开发用 Vite proxy，部署用 rewrite，前端子页面回退到 index.html。

## 面试官可能追问

- 怎样确认平台到上游这一段是否使用 TLS？
- 同源代理为什么不能代替接口身份校验？

## 代码证据

> **代码依据（不用于口述）**
>
> - [vite.config.ts，第 47～55 行](/Users/aaron/personal-hub/apps/project-1/vite.config.ts:47)：开发环境 `/api` 代理及 HTTP 上游。
> - [vercel.json，第 2～10 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：部署环境 API 重写和 SPA 路由回退。
> - [AI.tsx，第 149～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：Token、AI Key 和消息经过 `/api/ai/chat` 发出。
