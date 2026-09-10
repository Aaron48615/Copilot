---
id: shiguang-normal-deployment-verification-gap
title: 不足七：部署和代理还不能说成全部验证完成
aliases: [能讲讲项目中的部署与代理尚未完成的验证吗？, 关于部署与代理尚未完成的验证，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [不足, 部署版本, 代理, HTTP]
---

# 不足七：部署和代理还不能说成全部验证完成

## 核心回答

代码里已经有 AI、商城和图片代理，但如果要说某次部署都验证好了，我还是会对一下部署提交、环境变量和路由，不能只看本地有这些文件。然后用 Network 看实际请求和图片地址，再直接刷新子页面，确认也能打开。

【商城和图片的上游还是 HTTP，不能说全程 HTTPS。代理还会带来 Serverless 调用、图片带宽和维护成本。虽然代码配了浏览器和共享缓存，但到底命中了多少、稳定性怎么样，得看平台数据，不能只凭配置就说性能提升了多少或者省了多少钱。】

## 回答要点

- 代码里已经有 AI、商城和图片代理，但如果要说某次部署都验证好了，我还是会对一下部署提交、环境变量和路由，不能只看本地有这些文件。
- 商城和图片的上游还是 HTTP，不能说全程 HTTPS。

## 面试官可能追问

- 怎样确认本地代码对应某一次线上部署？
- 图片缓存是否有效应该看哪些实际证据？

## 代码证据

> **代码依据（不用于口述）**
> - [Vercel 配置第 6～18 行](/Users/aaron/personal-hub/apps/project-2/vercel.json:6)：三个服务端函数及路由顺序。
> - [商城代理第 1～2 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:1)、[图片代理第 1～12 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:1)：固定上游仍使用 HTTP。
> - [图片代理第 88～94 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:88)：成功图片的缓存和安全响应头。
