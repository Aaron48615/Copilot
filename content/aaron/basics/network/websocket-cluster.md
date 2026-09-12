---
id: aaron-basic-network-websocket-cluster
title: WebSocket 多实例部署时，怎样把消息发送给不同节点上的用户？
aliases: [WebSocket 集群怎样跨节点广播消息？, 多台服务器上的实时连接怎样协调？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [WebSocket, 集群, 消息广播, Redis Pub/Sub]
---

# WebSocket 多实例部署时，怎样把消息发送给不同节点上的用户？

## 核心回答

### 5. 集群扩展

多实例部署时，同一房间的用户可能连在不同服务节点上。通常借助 Redis Pub/Sub、Kafka 等消息系统广播事件，并考虑连接注册、会话路由、限流和节点优雅下线。
