---
id: lidi-202609-route-whitelist
title: 轻购为什么把轻购AI放进路由白名单？
aliases: [路由白名单, guide whiteList, 未登录AI]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [whiteList, guide, login, 路由守卫]
---

# 轻购为什么把轻购AI放进路由白名单？

## 核心回答

1. 当前路由白名单是 `/login`、`/register` 和 `/guide`。登录注册必须公开，轻购AI也被设计成可以先让用户体验，不强制登录才能输入需求。
2. `/search`、商品详情、购物车、地址、订单和“我的”等页面不在白名单里，没有 Token 时会先跳登录，因为这些页面会访问用户相关接口或订单数据。
3. 白名单只控制前端页面能不能进入，不代表 `/guide/recommend` 后端接口可以完全不做限制。后端仍然要决定是否允许匿名请求、是否限流和是否记录用量。
4. 如果轻购AI以后需要根据用户收藏、历史订单或个性化优惠推荐，就应该要求登录，或者只对需要用户数据的部分鉴权。
5. 所以白名单是产品体验和数据权限的取舍，不是安全漏洞的替代方案；真正的权限仍然在后端。

