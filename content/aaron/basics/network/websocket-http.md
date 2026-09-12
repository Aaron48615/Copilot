---
id: aaron-basic-network-websocket-http
title: WebSocket 和 HTTP 是什么关系？
aliases: [WebSocket 怎样通过 HTTP 升级建立连接？, WebSocket 建连后还是一轮轮 HTTP 请求吗？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [WebSocket, Upgrade, HTTP101, 帧]
---

# WebSocket 和 HTTP 是什么关系？

## 核心回答

它们都是应用层协议。经典 WebSocket 借 HTTP 完成初始握手与协议升级，成功后使用自己的帧格式通信，不能简单说成“一直发送 HTTP 请求的长连接”。

### 建立连接的过程

经典 WebSocket 通常通过 HTTP/1.1 的 `Upgrade` 机制建立连接：

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: https://example.com
```

服务端接受升级后返回：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ...
```

此后传输的是 WebSocket 帧，不再是一轮轮普通 HTTP 请求和响应。WebSocket 仍依赖底层可靠传输；生产环境一般使用加密的 `wss://`。

### 浏览器端基本用法

```js
const socket = new WebSocket("wss://example.com/ws");

socket.addEventListener("open", () => {
  socket.send(JSON.stringify({ type: "subscribe", channel: "orders" }));
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  console.log(message);
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error", event);
});

socket.addEventListener("close", (event) => {
  console.log("connection closed", event.code, event.reason);
});
```

`readyState` 有四种状态：`CONNECTING`、`OPEN`、`CLOSING`、`CLOSED`。只有连接为 `OPEN` 时才能正常调用 `send()`。

### 协议层需要知道什么

- 数据可以是文本或二进制，协议以“帧”为单位传输。
- 浏览器客户端发送的帧必须经过掩码处理；这不是加密，安全传输仍需 `wss`。
- 协议定义了 Ping/Pong 控制帧来检测连接。浏览器的经典 `WebSocket` API 不能直接发送协议级 Ping，业务上常用定时消息实现心跳。
- 双方都可以发送关闭帧，带上关闭码和原因，完成正常关闭握手。
- TCP 连接存在不代表业务连接一定可用。网络切换、代理超时和服务进程异常都可能产生“半开连接”，所以仍要有心跳与超时机制。
