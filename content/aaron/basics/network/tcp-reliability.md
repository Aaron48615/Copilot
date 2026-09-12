---
id: aaron-basic-network-tcp-reliability
title: TCP 为什么可靠
aliases: [TCP 如何保证数据可靠有序传输？, TCP 的可靠传输能保证业务处理成功吗？]
category: network
difficulty: 进阶
priority: high
projects: []
keywords: [TCP, ACK, 重传, 流量控制, 拥塞控制]
---

# TCP 为什么可靠

## 核心回答

TCP 是**面向连接、可靠、有序、全双工的字节流协议**。它主要通过以下机制提供可靠性：

- 序列号与累积确认 ACK。
- 校验和，检测传输损坏。
- 超时重传和快速重传。
- 接收端按序重组，去除重复数据。
- 滑动窗口做流量控制，避免压垮接收方。
- 慢启动、拥塞避免等拥塞控制，适应网络承载能力。

> [!warning]
> TCP 是字节流，不保留应用层消息边界，一次 `send` 不一定对应一次 `recv`。TCP 也只保证成功交给对端协议栈，不保证业务已入库；应用层仍需要消息边界、超时、幂等、重试和业务确认。
