---
id: lidi-202609-import-09-system-design-chat-stream-q02
title: 为什么要定义事件协议？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [聊天, SSE, 流式, 会话]
---

# 为什么要定义事件协议？

## 核心回答

如果前后端只约定“不断拼字符串”，遇到换行、分片、错误或未来新增状态就很难兼容。事件类型、消息 id、序号和结束标记明确后，客户端可以检测乱序、重复和缺包，服务端也能独立增加 thinking 或 fallback 等内部状态而不破坏旧客户端。

