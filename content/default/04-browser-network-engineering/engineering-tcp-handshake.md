---
id: engineering-tcp-handshake
title: TCP 三次握手和四次挥手讲一下？
aliases: [三次握手, 四次挥手, time_wait]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [三次握手, 四次挥手, SYN, TIME_WAIT]
---

# TCP 三次握手和四次挥手讲一下？

## 核心回答

建立 TCP 连接时，客户端发 SYN，服务端回 SYN 和 ACK，客户端再回 ACK。这样双方可以确认连接请求和初始序列号，避免服务端仅凭一个过期请求就建立连接。

关闭连接时，两边分别声明自己不再发送数据，所以常见的是 FIN、ACK、FIN、ACK 四个报文。不过确认和关闭报文可以在合适的情况下合并，不是每次都严格四个。

## 追问：TIME_WAIT 为什么要等待？

主动关闭的一方通常需要等一段时间，让旧连接的报文在网络中失效，同时有机会在对方重发 FIN 时再次确认，避免新连接受到旧报文影响。通常用 2MSL 描述这个等待时间。
