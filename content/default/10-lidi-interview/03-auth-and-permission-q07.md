---
id: lidi-202609-request-interceptor
title: 轻购的 Axios 请求拦截器和响应拦截器分别做什么？
aliases: [Axios拦截器, Authorization, A00004, request.ts]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [Axios, request interceptor, response interceptor, Bearer, 401]
---

# 轻购的 Axios 请求拦截器和响应拦截器分别做什么？

## 核心回答

1. 请求拦截器在请求发出之前执行。它读取 `getToken()`，如果有 Token，就统一设置 `Authorization: Bearer ${token}`，页面不需要每个接口手动加。
2. Axios 实例统一配置了 `baseURL` 和 5 秒 timeout，普通请求还通过 `get`、`post`、`put`、`del` 几个方法暴露给业务 API。
3. 响应成功时返回 `response.data`，让页面直接拿到后端业务对象；如果业务码是 `A00004`，说明登录失效，就触发统一退出。
4. 响应失败时检查 HTTP 401，同样清理 Token 并跳转登录。`redirectingToLogin` 保证多个并行请求失败时只处理一次跳转。
5. 统一拦截的好处是把公共逻辑集中起来；但业务错误仍然要由页面决定如何展示，比如购物车加载失败和订单支付失败的提示不同。

