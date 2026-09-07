---
id: lidi-202609-import-04-browser-network-engineering-websocket-sse-q01
title: SSE 为什么要处理残留 buffer？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [WebSocket, SSE, 实时数据, 重连]
---

# SSE 为什么要处理残留 buffer？

## 核心回答

网络分片不一定刚好按事件边界到达，一次 read 可能只有半行，也可能包含多个事件。客户端要把新数据接到 buffer，按空行切完整事件，最后未完成的部分留到下一次，不能每个 chunk 直接 JSON.parse。

