---
id: yunshu-followup-retry-boundary
title: 追问：为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗？
aliases: [能讲讲项目中的单次重试、独立刷新实例和 POST 边界吗？, 关于单次重试、独立刷新实例和 POST 边界，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, authRetry, Axios, 幂等]
---

# 追问：为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗？

## 核心回答

原请求最多重发一次，是为了避免新 Token 还是 401 时一直刷新。刷新接口单独用 Axios 实例，也避免它自己的 401 又进普通拦截器，递归触发刷新。

现在按原配置重发，没有区分 GET 和 POST，所以 POST 也会重试。但写操作需要后端保证鉴权失败时还没写入，或者支持幂等键，让重复请求只产生一次效果。

【网络超时不能随便重试非幂等 POST，因为后端可能已经处理成功，只是响应没回来。】

## 回答要点

- 原请求最多重发一次，是为了避免新 Token 还是 401 时一直刷新。
- 现在按原配置重发，没有区分 GET 和 POST，所以 POST 也会重试。
- 网络超时不能随便重试非幂等 POST，因为后端可能已经处理成功，只是响应没回来。

## 面试官可能追问

- 刷新请求走普通实例为什么可能递归？
- 写操作超时和鉴权失败为什么不能采用相同重试判断？

## 代码证据

> **代码依据（不用于口述）**
>
> - [request.ts，第 35～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:35)：`authRetry` 标记、刷新和原配置重放。
> - [authSession.ts，第 9～12 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:9)：刷新使用独立 Axios 客户端。
> - [auth.ts，第 4～25 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录、验证码和注册明确跳过鉴权刷新。
