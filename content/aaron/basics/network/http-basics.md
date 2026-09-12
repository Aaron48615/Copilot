---
id: aaron-basic-network-http-basics
title: HTTP 是什么
aliases: [HTTP 协议负责什么？, HTTP 无状态和请求响应是什么意思？]
category: network
difficulty: 基础
priority: normal
projects: []
keywords: [HTTP, 无状态, 请求响应]
---

# HTTP 是什么

## 核心回答

**HTTP（Hypertext Transfer Protocol）**是一个应用层协议，定义了客户端和服务器之间的请求、响应、方法、状态码、首部和缓存等语义。

面试可以概括为：

- **请求—响应模型**：客户端发请求，服务器返回响应。
- **无状态**：HTTP 协议本身不要求服务器记住前一次请求的业务上下文；可通过 Cookie/Session/Token 在应用层维持状态。
- **可扩展**：通过首部实现缓存、认证、内容协商、跨域等能力。
- **语义和传输分离**：HTTP/1.1 和 HTTP/2 通常基于 TCP；HTTP/3 基于 QUIC，QUIC 运行在 UDP 之上。

> [!important]
> “HTTP 基于 TCP”对 HTTP/1.1 和 HTTP/2 是常见正确概括，但不能覆盖 HTTP/3。HTTP/3 保留了 HTTP 方法、状态码和首部等语义，传输则换成 QUIC。
