---
id: lidi-202609-auth-and-permission-q01
title: 路由守卫和后端权限控制有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [Token, JWT, Axios, 路由守卫, 权限, 401, Redux Toolkit]
---

# 路由守卫和后端权限控制有什么区别？

## 核心回答

1. 路由守卫发生在页面跳转之前。轻购里它先检查有没有 Token，没有就跳到登录页，并把原来的路径放到 `redirect` 里；它解决的是页面访问体验。
2. 后端权限控制发生在接口收到请求以后。比如提交订单、修改地址和查看订单，后端必须根据 Token 判断用户身份和数据归属。
3. 只做路由守卫不安全，因为用户可以不经过页面，直接在开发者工具里调用接口。前端隐藏按钮也不能阻止恶意请求。
4. 所以前端负责提前拦截和给用户反馈，后端负责真正的权限边界，两边的职责不能混在一起。
