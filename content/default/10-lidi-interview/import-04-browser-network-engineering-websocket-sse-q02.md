---
id: lidi-202609-import-04-browser-network-engineering-websocket-sse-q02
title: 断线重连会不会重复消息？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [WebSocket, SSE, 实时数据, 重连]
---

# 断线重连会不会重复消息？

## 核心回答

可能会。服务端可以带事件 ID，客户端重连时带 Last-Event-ID；业务层还要设计幂等，不能因为重连就重复保存一条消息。没有 ID 时至少要在客户端记录已处理的消息标识。

