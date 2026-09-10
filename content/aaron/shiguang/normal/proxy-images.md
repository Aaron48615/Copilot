---
id: shiguang-normal-proxy-images
title: 部署代理和旧图片处理
aliases: [能讲讲项目中的部署代理和旧图片处理吗？, 关于部署代理和旧图片处理，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [Vercel, 图片代理, 请求头白名单]
---

# 部署代理和旧图片处理

## 核心回答

部署时，我把商城接口、图片和 AI 请求分别接到了本站的 `/api`、`/shop-images` 和 `/api/ai`，再由 Vercel 服务端函数请求固定的上游。这样页面不用到处写真实地址，转发时的请求头、超时和错误也能集中处理。

旧图片链接不一定只在一个字段里，也可能藏在数组、对象或者商品介绍的 HTML 里，所以响应拦截器会递归处理字符串，只替换指定的旧域名。图片代理也限制了方法、路径、返回类型和大小，不是传任意网址都能转发。

【图片请求只允许 GET、HEAD，不带业务 Token 和 Cookie。正常图片会缓存，商城用户数据不缓存。不过商城和图片的上游还是 HTTP，不能因为加了代理就说整条链路都是 HTTPS。】

## 回答要点

- 部署时，我把商城接口、图片和 AI 请求分别接到了本站的 `/api`、`/shop-images` 和 `/api/ai`，再由 Vercel 服务端函数请求固定的上游。
- 旧图片链接不一定只在一个字段里，也可能藏在数组、对象或者商品介绍的 HTML 里，所以响应拦截器会递归处理字符串，只替换指定的旧域名。
- 图片请求只允许 GET、HEAD，不带业务 Token 和 Cookie。

## 面试官可能追问

- 图片代理怎样避免接收任意上游地址？
- 浏览器访问 HTTPS 为什么不代表上游也是 HTTPS？

## 代码证据

> **代码依据（不用于口述）**
> - [Vercel 配置第 11～18 行](/Users/aaron/personal-hub/apps/project-2/vercel.json:11)：AI、图片、商城代理和 SPA 回退的匹配顺序。
> - [request.ts 第 44～49 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:44)：商城响应进入图片地址改写。
> - [shopImages.ts 第 3～19 行](/Users/aaron/personal-hub/apps/project-2/src/utils/shopImages.ts:3)：递归处理字符串、数组和对象中的旧图片地址。
> - [商城代理第 1～2、19～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:1)：固定上游、路径限制和请求头白名单。
> - [商城代理第 52～80 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:52)：转发请求、禁止重定向、超时和 no-store。
> - [图片代理第 1～12、21～63 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:1)：固定来源、图片类型白名单、路径规则和响应头大小检查。
> - [图片代理第 65～94 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:65)：读取流时再次限制 4 MiB，并设置图片缓存和安全响应头。
