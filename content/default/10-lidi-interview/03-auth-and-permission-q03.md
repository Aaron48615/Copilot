---
id: lidi-202609-auth-and-permission-q03
title: 把 Token 放在哪里更安全？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [Token, JWT, Axios, 路由守卫, 权限, 401, Redux Toolkit]
---

# 把 Token 放在哪里更安全？

## 核心回答

1. 当前轻购实际把 `accessToken` 存在 `localStorage`，刷新页面后还能保持登录；Axios 请求拦截器每次发请求时再读取它。
2. 风险是页面存在 XSS 时，恶意脚本可能读取 localStorage 里的 Token，所以我不会说它是最安全的方案。
3. 更安全的常见方案是 HttpOnly Cookie，JavaScript 不能直接读取，能降低 Token 被脚本拿走的风险，但还要配合 CSRF、SameSite、HTTPS 和过期时间。
4. 最终方案要和后端一起定。无论使用 Cookie 还是 Token，后端都必须校验签名、有效期和权限，前端存储方式不是完整的安全方案。
