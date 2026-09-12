---
id: aaron-basic-network-websocket-recovery
title: WebSocket 断线后，怎样恢复连接并避免业务消息遗漏或重复？
aliases: [WebSocket 的重连和消息确认怎么处理？, WebSocket 怎样在断线后恢复业务消息？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [WebSocket, 重连, 幂等, 消息ID, ACK]
---

# WebSocket 断线后，怎样恢复连接并避免业务消息遗漏或重复？

## 核心回答

### 1. 断线重连

不要固定间隔让所有客户端同时重连。应使用指数退避并加入随机抖动，例如等待时间依次接近 `1s、2s、4s、8s`，再设置最大值。主动退出、鉴权失败等情况不应无限重连。

### 2. 消息可靠性

WebSocket 只保证底层字节流可靠，不自动提供业务消息的“已处理一次”语义。重要业务通常还需要：

- 消息 ID 和服务端 ACK；
- 断线后按游标补拉遗漏消息；
- 幂等处理，避免重发造成重复扣款或重复提交；
- 有序性要求较高时携带序列号并检查缺口。
