---
id: lidi-202609-import-09-system-design-chat-stream-q01
title: 半截回答怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [聊天, SSE, 流式, 会话]
---

# 半截回答怎么处理？

## 核心回答

流中断时把助手消息标成 interrupted，并保存已经收到的文本和原因，用户可以选择继续或重新生成。重新生成不能覆盖原消息，应该生成新的版本，方便审计和比较。前端收到 done 才把状态置为 completed，不能因为连接关闭就默认成功。

