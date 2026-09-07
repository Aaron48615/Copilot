---
id: lidi-202609-import-04-browser-network-engineering-http2-http3-q01
title: HTTP/2 还需要域名分片吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [HTTP/1.1, HTTP/2, HTTP/3, QUIC, 多路复用]
---

# HTTP/2 还需要域名分片吗？

## 核心回答

通常不需要，多个资源可以复用一条连接。为了绕过旧浏览器的连接限制而做域名分片，到了 HTTP/2 反而可能失去连接复用和缓存收益。

