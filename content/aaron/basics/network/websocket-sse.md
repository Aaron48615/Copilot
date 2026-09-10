---
id: aaron-basic-network-websocket-sse
title: WebSocket 和 SSE 怎么选择？
aliases: [实时消息一定要用 WebSocket 吗？, 服务端持续推送内容有哪些方式？]
category: network
difficulty: 基础
priority: normal
projects: []
keywords: [WebSocket, SSE, EventSource, 实时通信]
---

# WebSocket 和 SSE 怎么选择？

## 核心回答

选择时主要看消息是不是需要频繁双向发送。WebSocket 建立连接以后，客户端和服务端都能主动发消息，像协同编辑这种双方一直在交互的场景比较适合。

SSE 更偏服务端持续往浏览器推文本，比如进度、通知或者逐步返回的文字。浏览器可以用 EventSource 接收，它有事件解析和自动重连能力。如果客户端只是先提交一次，后面主要等服务器推送，我更偏向 SSE 加普通 HTTP 请求，消息方向比较清楚，也能利用 EventSource 已有的能力。

两种方式都得考虑断线、登录失效和重复消息，组件不用了也要关连接。“实时”不一定就要用 WebSocket，还是看消息方向和频率，选适合这个交互的方式。
