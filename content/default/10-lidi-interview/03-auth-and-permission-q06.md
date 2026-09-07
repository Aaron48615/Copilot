---
id: lidi-202609-login-redirect
title: 轻购为什么要保存 redirect，登录后为什么用 replace？
aliases: [登录回跳, redirect query, router replace]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [router.beforeEach, redirect, replace, fullPath]
---

# 轻购为什么要保存 redirect，登录后为什么用 replace？

## 核心回答

1. 用户可能从商品详情、购物车或订单页面进入，但没有登录。路由守卫不能只跳到 `/login`，还要把原来的 `to.fullPath` 放到 query 的 `redirect` 中。
2. 登录成功后，登录页读取 `route.query.redirect`。它是字符串时回到原页面，否则回到 `/home`，所以用户不会因为登录丢掉原来的目标。
3. 使用 `router.replace` 是因为登录页只是中间页。替换掉登录页历史以后，用户点击返回不会又回到刚才的登录页。
4. redirect 不能直接信任成任意外部 URL。当前项目只传站内的 `to.fullPath`，如果以后允许更多来源，还要校验路径，避免开放重定向。
5. 这是一个小功能，但能把鉴权和用户体验连接起来：守卫负责拦截，登录页负责完成以后回到原操作路径。

