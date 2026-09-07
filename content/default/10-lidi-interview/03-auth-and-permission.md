---
id: lidi-202609-auth-and-permission
title: 轻购或城市视图的登录鉴权和权限控制是怎么做的？
aliases: [Token 鉴权, 登录权限, 路由守卫, Axios 鉴权, RBAC]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [Token, JWT, Axios, 路由守卫, 权限, 401, Redux Toolkit]
---

# 轻购或城市视图的登录鉴权和权限控制是怎么做的？

## 核心回答

1. 轻购登录成功后，后端返回 `accessToken`，前端通过 `setToken` 写入 `localStorage`。之后普通接口都经过 `src/utils/request.ts` 创建的 Axios 实例，请求拦截器统一读取 Token，加到 `Authorization: Bearer <token>` 请求头。
2. 路由守卫在进入页面前检查 Token。当前白名单是登录、注册和轻购AI页面，其他页面没有 Token 就跳到登录页，并通过 `redirect` 参数记录原来想访问的地址。
3. 登录页成功后读取 `route.query.redirect`，如果是字符串就回到原页面，否则进入首页。这样用户从购物车或详情页被拦到登录页，登录后不会丢掉原来的路径。
4. 这只是前端访问控制，不能代替后端权限校验。商品、订单和地址的数据权限必须由服务端根据 Token 判断，用户也可以绕过页面直接发请求。
5. 如果响应是 HTTP 401，或者业务码是 `A00004`，Axios 响应拦截器会清理 Token，再通过 `router.replace` 跳回登录页。`redirectingToLogin` 标记可以避免多个失败请求同时触发多次跳转。
