---
id: lidi-202609-network-axios-q04
title: 什么是 CORS 预检请求？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [HTTP, GET, POST, 401, 404, 500, CORS, OPTIONS, Axios, Network]
---

# 什么是 CORS 预检请求？

## 核心回答

1. 当跨域请求使用了某些非简单方法、请求头或内容类型时，浏览器可能先发送一个 OPTIONS 请求，询问服务端是否允许真正的请求。
2. 服务端需要返回允许的来源、方法和请求头等信息，浏览器确认后才发送真正请求。
3. 如果预检失败，页面里可能看到请求被浏览器拦截，甚至后端业务接口根本没有收到真正的请求。
4. 排查时要在 Network 里看 OPTIONS 请求的状态和响应头，而不是只盯着后面的业务请求。

