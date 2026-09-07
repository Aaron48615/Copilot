---
id: lidi-202609-import-04-browser-network-engineering-http2-http3-q03
title: 前端能直接决定使用哪个协议吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [HTTP/1.1, HTTP/2, HTTP/3, QUIC, 多路复用]
---

# 前端能直接决定使用哪个协议吗？

## 核心回答

不能，主要由服务器和 CDN 通过协商提供。前端能做的是减少关键资源、正确缓存、避免不必要的请求，并用 Network 面板确认实际使用的协议。

