---
id: lidi-202609-import-04-browser-network-engineering-engineering-tcp-handshake
title: TCP 三次握手和四次挥手讲一下？
aliases: [三次握手, 四次挥手, time_wait]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [三次握手, 四次挥手, SYN, TIME_WAIT]
---

# TCP 三次握手和四次挥手讲一下？

## 核心回答

建立 TCP 连接时，客户端发 SYN，服务端回 SYN 和 ACK，客户端再回 ACK。这样双方可以确认连接请求和初始序列号，避免服务端仅凭一个过期请求就建立连接。

关闭连接时，两边分别声明自己不再发送数据，所以常见的是 FIN、ACK、FIN、ACK 四个报文。不过确认和关闭报文可以在合适的情况下合并，不是每次都严格四个。

