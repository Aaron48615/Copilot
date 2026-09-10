---
id: shiguang-followup-proxy-boundary
title: 追问：为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理？
aliases: [能讲讲项目中的同源代理、图片代理和开放代理风险吗？, 关于同源代理、图片代理和开放代理风险，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, 同源代理, 图片代理, 上游白名单]
---

# 追问：为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理？

## 核心回答

部署版统一请求本站，AI 走 `/api/ai`，商城走 `/api/...`，图片走 `/shop-images/...`，再由服务端函数访问固定上游。这样共享 AI Key 不用给浏览器，请求头、超时、错误和缓存也能集中处理。光替换图片地址不够，本站还得真的能返回图片。

代理固定上游、检查路径和请求头，不能让用户随便传个网址就转发。图片还限制 GET、HEAD，检查图片类型和实际大小，不带 Cookie 或 Authorization。

【商城拒绝绝对路径、协议字符串和 `..`；图片按栅格图片路径规则校验，流读取最多 4 MiB。商城用 no-store，成功图片才缓存。`/api/ai` 要在商城通配规则前，SPA 回退放最后。商城和图片上游仍是 HTTP，改个字符串不会让上游支持 HTTPS，代理本身也有 Serverless 和带宽成本。】

## 回答要点

- 部署版统一请求本站，AI 走 `/api/ai`，商城走 `/api/...`，图片走 `/shop-images/...`，再由服务端函数访问固定上游。
- 代理固定上游、检查路径和请求头，不能让用户随便传个网址就转发。
- 商城拒绝绝对路径、协议字符串和 `..`；图片按栅格图片路径规则校验，流读取最多 4 MiB。

## 面试官可能追问

- 图片代理为什么不转发 Authorization 和 Cookie？
- 通配商城路由放在 AI 路由之前可能有什么影响？

## 代码证据

> **代码依据（不用于口述）**
> - [Vercel 配置第 11～18 行](/Users/aaron/personal-hub/apps/project-2/vercel.json:11)：三类代理和 SPA 回退顺序。
> - [商城代理第 19～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:19)：固定上游、路径校验和请求头白名单。
> - [商城代理第 52～80 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:52)：请求转发、禁止重定向、超时和 no-store。
> - [图片代理第 21～63 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:21)：方法、路径、响应类型和声明大小检查。
> - [图片代理第 65～94 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:65)：流式大小限制、缓存和安全响应头。
> - [Vite 配置第 15～37 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:15)：开发代理及 AI 路径排除；Vite 本身不运行服务端函数。
