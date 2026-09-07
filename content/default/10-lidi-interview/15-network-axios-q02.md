---
id: lidi-202609-network-axios-q02
title: GET 和 POST 有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [HTTP, GET, POST, 401, 404, 500, CORS, OPTIONS, Axios, Network]
---

# GET 和 POST 有什么区别？

## 核心回答

1. GET 通常用于获取资源，参数常放在 URL 的 query 中；POST 通常用于提交或创建数据，参数一般放在请求体中。
2. GET 更强调可缓存和幂等的读取语义，但实际是否缓存还要看请求头和浏览器行为。
3. POST 不是天然安全，密码和敏感信息仍然需要 HTTPS，不能因为放在请求体里就认为别人看不到。
4. 具体使用哪种方法要遵循后端接口约定，不应该为了隐藏参数就把所有 GET 改成 POST。

