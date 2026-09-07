---
id: lidi-202609-import-09-system-design-chat-stream
title: 设计一个支持流式回答的聊天页面
aliases: [聊天流设计, SSE 聊天系统设计]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [聊天, SSE, 流式, 会话]
---

# 设计一个支持流式回答的聊天页面

## 核心回答

我会把消息持久化和生成流拆开：用户消息先落库并得到 id，服务端再按会话和消息 id 推送 `text`、`status`、`error`、`done` 等明确事件。前端用 TextDecoder 维护残留 buffer，按协议边界解析，增量更新当前助手消息；断线时显示可重试状态，重复发送和重连都带幂等键。模型 key 留在服务端，服务端还要做超时、限流、敏感信息处理和输出长度限制。

