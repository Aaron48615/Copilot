---
id: lidi-202609-import-04-browser-network-engineering-websocket-sse-q03
title: 鉴权放在哪里？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [WebSocket, SSE, 实时数据, 重连]
---

# 鉴权放在哪里？

## 核心回答

WebSocket 可以在握手时通过 Cookie 或受控 token 鉴权；SSE 的 EventSource 原生对自定义 header 支持有限，常见做法是 Cookie、短期签名 URL，或用 fetch 自己读取流。无论哪种方式，服务端都必须再次验证权限，不能只相信前端菜单。

