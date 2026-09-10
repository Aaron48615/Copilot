---
id: aaron-basic-network-http-versions
title: HTTP/1.1、HTTP/2 和 HTTP/3 有什么差别？
aliases: [HTTP/2 的多路复用解决了什么问题？, HTTP/3 为什么使用 QUIC？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [HTTP1.1, HTTP2, HTTP3, 多路复用, QUIC]
---

# HTTP/1.1、HTTP/2 和 HTTP/3 有什么差别？

## 核心回答

这几个版本的差别，可以从多个资源怎么传来看。HTTP/1.1 可以复用连接，但同一连接上的请求处理还是有排队问题，所以浏览器常用多条连接来提高并发。HTTP/2 可以把不同请求的数据拆成帧，在同一条连接里交错传输，这就是多路复用，还能压缩请求和响应的头部。

不过 HTTP/2 底下还是 TCP，丢包后等待补齐数据，可能一起影响多个流。HTTP/3 换成基于 UDP 的 QUIC，让不同流的数据更独立地交付，减少这种互相等待。可靠传输由 QUIC 提供，不是用了 UDP 就放任数据丢失。

协议升级能改善一部分传输问题，但不能解决页面所有性能问题。实际用了哪个协议，可以在 Network 里看，也不是前端写一行代码就能决定，还要浏览器、服务端和网络配合。
