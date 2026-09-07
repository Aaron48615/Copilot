---
id: engineering-axios-interceptors
title: Axios 请求模块和 Token 鉴权是怎么封装的？
aliases: [axios封装, token鉴权, 请求拦截器, 响应拦截器, 401怎么处理]
category: engineering
difficulty: 项目
priority: high
projects: []
keywords: [Axios, Authorization, Bearer, 401, 路由守卫]
---

# Axios 请求模块和 Token 鉴权是怎么封装的？

## 核心回答

可以创建一个统一的 Axios 实例，把 baseURL、超时和通用拦截逻辑放进去。请求拦截器负责带上登录凭证，响应拦截器处理统一的数据格式和错误。

比如遇到 401，可以按接口约定清理失效会话或尝试刷新；403 通常提示没有权限。多个请求同时失败时，要避免重复刷新或反复跳转登录页。

## 追问：登录之后怎么回到原页面？

跳转登录前保存站内目标地址，成功后用 replace 返回，避免返回键再次进入登录页。目标地址要校验，不能直接接受任意外部 URL，防止开放重定向。
