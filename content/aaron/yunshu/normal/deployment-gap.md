---
id: yunshu-normal-deployment-gap
title: 不足八：部署代理和第三方资源仍需要环境级验证
aliases: [能讲讲项目中的代理和第三方资源的部署验证缺口吗？, 关于代理和第三方资源的部署验证缺口，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, Vercel, 高德 Key, smoke test]
---

# 不足八：部署代理和第三方资源仍需要环境级验证

## 核心回答

部署配置写了，不代表线上都能用。环境变量没配、上游访问不到、HTTP 被限制，或者高德 Key 的域名白名单、配额不匹配，都可能让本地正常、线上出问题。

我会把上游改 HTTPS，再在 CI 或部署后检查 /api、前端子页面、高德 SDK 和必要环境变量，给代理超时和第三方失败加监控。

【这类基础检查也叫 smoke test。仓库已有 Vite 代理、Vercel 重写、SPA 回退和环境变量注入，实际生效情况还需要验证。】

## 回答要点

- 部署配置写了，不代表线上都能用。环境变量没配、上游访问不到、HTTP 被限制，或者高德 Key 的域名白名单、配额不匹配，都可能让本地正常、线上出问题。
- 我会把上游改 HTTPS，再在 CI 或部署后检查 /api、前端子页面、高德 SDK 和必要环境变量，给代理超时和第三方失败加监控。
- 这类基础检查也叫 smoke test。仓库已有 Vite 代理、Vercel 重写、SPA 回退和环境变量注入，实际生效情况还需要验证。

## 面试官可能追问

- 本地代理正常而线上失败时先核对哪些配置？
- 怎样确认前端子页面和 API 重写都实际生效？

## 代码证据

> **代码依据（不用于口述）**
>
> - [vite.config.ts，第 32～61 行](/Users/aaron/personal-hub/apps/project-1/vite.config.ts:32)：开发代理和高德安全配置注入。
> - [amap.ts，第 1～4 行](/Users/aaron/personal-hub/apps/project-1/src/config/amap.ts:1)：浏览器运行时读取高德安全环境变量。
> - [vercel.json，第 2～10 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：生产重写与单页应用回退规则。
