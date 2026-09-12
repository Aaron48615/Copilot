---
id: aaron-basic-network-websocket-heartbeat
title: WebSocket 为什么还需要心跳？
aliases: [WebSocket 连接断开为什么不能立刻发现？, WebSocket 怎样检测半开连接？]
category: network
difficulty: 基础
priority: normal
projects: []
keywords: [WebSocket, 心跳, 超时]
---

# WebSocket 为什么还需要心跳？

## 核心回答

因为断网、NAT、负载均衡器和代理可能静默清理连接，双方无法立即感知。心跳用于确认应用层连接仍然可用，并及时回收无效资源。

### 3. 心跳和连接保活

客户端定期发送心跳，服务端在超时后释放连接；同时监听页面可见性、网络在线状态，避免后台页面无意义地高频发送。
