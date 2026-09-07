---
id: lidi-202609-import-04-browser-network-engineering-http2-http3-q02
title: HTTP/3 为什么用 UDP 还能可靠？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [HTTP/1.1, HTTP/2, HTTP/3, QUIC, 多路复用]
---

# HTTP/3 为什么用 UDP 还能可靠？

## 核心回答

可靠性、重传和拥塞控制由 QUIC 自己实现，UDP 只是提供更轻的传输基础。QUIC 还可以让不同流独立推进，一个流丢包不必阻塞其他流。

