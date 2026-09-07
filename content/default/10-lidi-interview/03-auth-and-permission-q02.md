---
id: lidi-202609-auth-and-permission-q02
title: Token 过期了怎么办？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [Token, JWT, Axios, 路由守卫, 权限, 401, Redux Toolkit]
---

# Token 过期了怎么办？

## 核心回答

1. 当前项目在 Axios 响应拦截器里处理两种情况：HTTP 状态码是 401，或者响应数据里的业务码是 `A00004`。
2. 发现失效后先调用 `removeToken`，不要继续拿旧 Token 请求；然后动态引入路由，跳转到登录页，并把当前路径、查询参数和 hash 保存到 `redirect`。
3. 如果同时有多个接口返回失效，`redirectingToLogin` 会避免它们触发多次登录跳转；已经在登录页或注册页时也不会重复跳转。
4. 当前项目做的是“失效退出”，没有实现刷新 Token 接口。我会明确说明这一点；如果后端以后提供刷新接口，再集中处理刷新请求，让其他失败请求等待同一个结果。
