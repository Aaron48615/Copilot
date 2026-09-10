---
id: yunshu-followup-jwt-exp
title: 追问：解析 JWT 的 exp 就算鉴权了吗？JWT 是不是加密的？
aliases: [能讲讲项目中的JWT 解码、exp 和真实鉴权的区别吗？, 关于JWT 解码、exp 和真实鉴权的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, JWT, exp, 验签]
---

# 追问：解析 JWT 的 exp 就算鉴权了吗？JWT 是不是加密的？

## 核心回答

不算。前端只是解码 JWT 里的 exp，用来安排刷新和控制页面，没有验证签名。这里的载荷可以用 Base64URL 解码，编码不等于加密，不能放需要对用户保密的数据。

后端还得检查签名、有效期、必要声明，以及接口和数据权限，不能因为用户改了浏览器里的角色或时间就放行。

【当前前端解析失败会把 Token 当成无效或过期处理。】

## 回答要点

- 不算。前端只是解码 JWT 里的 exp，用来安排刷新和控制页面，没有验证签名。
- 后端还得检查签名、有效期、必要声明，以及接口和数据权限，不能因为用户改了浏览器里的角色或时间就放行。
- 当前前端解析失败会把 Token 当成无效或过期处理。

## 面试官可能追问

- 用户修改本地角色或 exp 后后端应该如何判断？
- JWT 载荷为什么不应包含需要向用户保密的信息？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authToken.ts，第 11～38 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:11)：解码 JWT 载荷并读取 exp，没有签名校验。
> - [UseAuth.tsx，第 14～32 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/UseAuth.tsx:14)：解析结果只用于前端路由显示和过期拦截。
