---
id: lidi-202609-import-04-browser-network-engineering-websocket-sse
title: WebSocket 和 SSE 怎么选择？
aliases: [实时通信, Server-Sent Events, WebSocket SSE]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [WebSocket, SSE, 实时数据, 重连]
---

# WebSocket 和 SSE 怎么选择？

## 核心回答

WebSocket 建立后可以双向通信，适合聊天、协同编辑、需要客户端和服务端频繁互发消息的场景。SSE 是服务端向浏览器单向推送，浏览器用 EventSource 或 fetch 流读取，适合进度、通知和 AI 逐字输出，协议和断线重连相对简单。

选型还要看代理、超时、鉴权和部署。SSE 响应要保持 `text/event-stream`，中间层不能把数据一直缓冲；WebSocket 则要确保升级连接和连接数管理。两者都不是“连上就万事大吉”，都需要心跳、重连、关闭和权限校验。

