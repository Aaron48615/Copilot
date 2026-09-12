---
id: aaron-basic-network-tcp-udp
title: TCP 和 UDP 有什么区别？
aliases: [TCP 与 UDP 的传输方式怎么比较？, 基于 UDP 的应用一定不可靠吗？]
category: network
difficulty: 基础
priority: normal
projects: []
keywords: [TCP, UDP, QUIC, 可靠传输]
---

# TCP 和 UDP 有什么区别？

## 核心回答

### TCP 和 UDP

| 对比项 | TCP | UDP |
| --- | --- | --- |
| 连接 | 面向连接 | 无连接 |
| 数据形式 | 字节流，没有天然消息边界 | 一个个数据报，保留消息边界 |
| 可靠性 | 序号、确认、重传、流量与拥塞控制 | 协议本身不保证送达、有序和不重复 |
| 开销 | 状态与控制机制较多 | 首部小、机制简单 |
| 场景 | HTTP/1.1、HTTP/2、传统 WebSocket 等 | DNS 查询、实时音视频；QUIC 构建在 UDP 之上 |

“UDP 不可靠”不等于基于 UDP 的应用一定不可靠。应用层可以自行实现确认、重传和拥塞控制。例如 HTTP/3 使用 QUIC，QUIC 构建在 UDP 之上，但在协议自身提供了可靠传输、安全握手和多路复用能力。
