---
id: lidi-202609-network-axios-q03
title: 什么是跨域？怎么解决？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [HTTP, GET, POST, 401, 404, 500, CORS, OPTIONS, Axios, Network]
---

# 什么是跨域？怎么解决？

## 核心回答

1. 浏览器的同源策略会限制一个源的页面直接读取另一个源的响应。协议、域名和端口任意一个不同，都可能构成跨域。
2. 开发环境常用 Vite 或 Webpack 的 dev server 代理，把浏览器请求转到同源开发服务器，再由开发服务器访问后端。
3. 生产环境可以让后端正确配置 CORS，也可以通过同域反向代理解决。CORS 是浏览器的访问控制机制，不能只靠前端代码绕过。
4. JSONP 只适用于 GET，限制比较多，现在普通接口一般优先使用 CORS 或代理。

