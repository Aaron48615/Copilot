---
id: aaron-basic-network-websocket-backpressure
title: WebSocket 发送太快时，怎样控制缓冲区压力？
aliases: [WebSocket 如何避免待发送数据无限堆积？, bufferedAmount 可以怎样用于发送限流？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [WebSocket, 背压, bufferedAmount]
---

# WebSocket 发送太快时，怎样控制缓冲区压力？

## 核心回答

### 4. 背压

经典浏览器 `WebSocket` API 没有自动背压机制。生产端应观察 `bufferedAmount`，在待发送数据过多时限流、合并或丢弃允许丢失的消息，否则可能造成内存和 CPU 压力。

```js
function safeSend(socket, data) {
  const maxBufferedBytes = 1 * 1024 * 1024;
  if (socket.readyState !== WebSocket.OPEN) return false;
  if (socket.bufferedAmount > maxBufferedBytes) return false;
  socket.send(data);
  return true;
}
```
