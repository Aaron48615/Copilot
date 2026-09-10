---
id: yunshu-normal-route-auth
title: 前端路由鉴权
aliases: [能讲讲项目中的前端登录与路由鉴权吗？, 关于前端登录与路由鉴权，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [JWT, Redux, UseAuth]
---

# 前端路由鉴权

## 核心回答

登录时提交账号、密码、验证码 ID 和验证码内容，业务码成功后，把 Token 和用户信息存进 Redux，再跳首页。

需要登录的页面统一经过 UseAuth。没有 Token 就去登录页，有 Token 就读取 JWT 里的过期时间；过期时先不显示业务页面，由全局会话组件提示重新登录。这样不用每页重复判断，也避免过期后业务内容先闪一下。

【前端这里只决定页面是否显示，Token 签名和接口权限还得后端校验。】

## 回答要点

- 登录时提交账号、密码、验证码 ID 和验证码内容，业务码成功后，把 Token 和用户信息存进 Redux，再跳首页。
- 需要登录的页面统一经过 UseAuth。没有 Token 就去登录页，有 Token 就读取 JWT 里的过期时间；过期时先不显示业务页面，由全局会话组件提示重新登录。
- 前端这里只决定页面是否显示，Token 签名和接口权限还得后端校验。

## 面试官可能追问

- JWT 过期时为什么先不渲染业务页面？
- 前端判断 exp 为什么不能代替后端验签？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Login.tsx，第 33～57 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：提交登录参数、判断业务码、保存登录信息并跳转。
> - [auth.ts，第 4～25 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录、验证码和注册接口跳过鉴权及自动刷新。
> - [authSlice.tsx，第 5～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:5)：Token 和用户信息的 Redux 状态及退出操作。
> - [UseAuth.tsx，第 8～32 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/UseAuth.tsx:8)：白名单、未登录跳转和过期页面拦截。
> - [router/index.tsx，第 30～161 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:30)：受保护布局和登录页接入统一路由守卫。
