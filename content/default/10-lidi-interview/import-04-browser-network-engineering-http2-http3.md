---
id: lidi-202609-import-04-browser-network-engineering-http2-http3
title: HTTP/1.1、HTTP/2 和 HTTP/3 有什么差别？
aliases: [HTTP2 HTTP3, 多路复用, QUIC]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [HTTP/1.1, HTTP/2, HTTP/3, QUIC, 多路复用]
---

# HTTP/1.1、HTTP/2 和 HTTP/3 有什么差别？

## 核心回答

HTTP/1.1 通常一个连接上顺序处理请求，虽然有 keep-alive，但多个资源仍容易互相等待。HTTP/2 在一个连接里做多路复用，用二进制帧、头部压缩和流优先级减少了很多连接开销。HTTP/3 把传输层换成基于 UDP 的 QUIC，把连接建立和 TLS 合在一起，也避免了 TCP 丢一个包就卡住所有流的队头阻塞。

这不代表升级协议就自动变快。资源大小、服务器配置、网络质量、缓存和页面自身的阻塞仍然决定体验。前端更多是避免错误的资源拆分和过度请求，再配合服务端开启合适协议。

