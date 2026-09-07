---
id: lidi-202609-network-axios-q01
title: 常见 HTTP 状态码怎么理解？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [HTTP, GET, POST, 401, 404, 500, CORS, OPTIONS, Axios, Network]
---

# 常见 HTTP 状态码怎么理解？

## 核心回答

1. 200 一般表示请求成功，201 常见于资源创建成功，204 表示成功但没有响应体。
2. 400 通常表示请求参数不符合要求，401 表示没有通过身份认证或 Token 失效，403 表示身份存在但没有权限。
3. 404 表示资源不存在，409 常见于资源冲突，429 表示请求过于频繁。
4. 500 及以上通常表示服务端发生错误。前端要给用户合适的提示，同时保留请求信息帮助排查，不能把所有错误都简单说成“网络错误”。

