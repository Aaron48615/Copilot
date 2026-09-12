---
id: aaron-basic-network-websocket-origin
title: WebSocket 是否受 CORS 限制？
aliases: [WebSocket 跨站连接如何控制安全？, WebSocket 握手和消息阶段怎样校验访问权限？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [WebSocket, Origin, 鉴权, CORS]
---

# WebSocket 是否受 CORS 限制？

## 核心回答

浏览器 WebSocket 握手不直接套用 `fetch` 的 CORS 流程，但浏览器会发送 `Origin`。服务端必须检查允许的来源，不能因为“没有 CORS 报错”就忽略跨站风险。

### 鉴权与安全

- 使用 `wss://`，服务端校验 `Origin`，避免跨站 WebSocket 劫持。
- 浏览器的 `WebSocket` 构造函数不能像 `fetch` 一样任意设置 `Authorization` 请求头。常见方案是握手时携带安全的 `HttpOnly` Cookie，或者先用 HTTPS 获取短时、一次性的连接票据。
- 不要把长期有效的 Token 直接放在查询字符串里，因为 URL 可能进入代理和服务端日志。
- 握手鉴权通过后，每条业务消息仍需校验用户是否有权执行对应操作。
- 对消息大小、发送频率和连接数做限制，并严格校验输入数据。
