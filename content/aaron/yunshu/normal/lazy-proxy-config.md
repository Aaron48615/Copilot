---
id: yunshu-normal-lazy-proxy-config
title: 页面懒加载、接口代理和地图资源配置
aliases: [能讲讲项目中的页面懒加载与代理、地图资源配置吗？, 关于页面懒加载与代理、地图资源配置，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [React.lazy, Vite proxy, SPA 回退]
---

# 页面懒加载、接口代理和地图资源配置

## 核心回答

业务页面用了 React.lazy 按路由懒加载，Suspense 显示加载占位，首次打开不用同时加载所有页面。开发时统一请求 `/api`，由 Vite 代理到后端；部署配置也会重写 `/api`，其他页面路径回退到 index.html，支持刷新前端子页面。

【高德安全配置通过 Vite 环境变量注入。配置文件存在不等于线上代理和环境变量都已验证，现在代理上游还是 HTTP，平台到上游这段没有体现 TLS 保护。】

## 回答要点

- 业务页面用了 React.lazy 按路由懒加载，Suspense 显示加载占位，首次打开不用同时加载所有页面。
- 高德安全配置通过 Vite 环境变量注入。配置文件存在不等于线上代理和环境变量都已验证，现在代理上游还是 HTTP，平台到上游这段没有体现 TLS 保护。

## 面试官可能追问

- 直接刷新前端子页面为什么需要回退配置？
- 高德配置存在为什么不代表部署环境已可用？

## 代码证据

> **代码依据（不用于口述）**
>
> - [router/index.tsx，第 6～27 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:6)：页面级懒加载和统一 Suspense 占位。
> - [vite.config.ts，第 32～61 行](/Users/aaron/personal-hub/apps/project-1/vite.config.ts:32)：高德安全配置注入、开发代理和路径别名。
> - [amap.ts，第 1～4 行](/Users/aaron/personal-hub/apps/project-1/src/config/amap.ts:1)：运行时高德安全密钥配置。
> - [vercel.json，第 2～10 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：生产接口重写和单页应用路由回退配置。
