---
id: lidi-202609-import-04-browser-network-engineering-engineering-tcp-handshake-q01
title: TIME_WAIT 为什么要等待？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [三次握手, 四次挥手, SYN, TIME_WAIT]
---

# TIME_WAIT 为什么要等待？

## 核心回答

主动关闭的一方通常需要等一段时间，让旧连接的报文在网络中失效，同时有机会在对方重发 FIN 时再次确认，避免新连接受到旧报文影响。通常用 2MSL 描述这个等待时间。

