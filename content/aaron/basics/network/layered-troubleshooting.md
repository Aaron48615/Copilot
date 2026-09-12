---
id: aaron-basic-network-layered-troubleshooting
title: 排查网络问题怎么用分层思路？
aliases: [如何按网络层次定位连接问题？, 网络请求失败时如何分层检查？]
category: network
difficulty: 基础
priority: normal
projects: []
keywords: [网络排查, 链路, TLS, HTTP]
---

# 排查网络问题怎么用分层思路？

## 核心回答

可以从低到高检查：链路是否连通、是否拿到 IP、路由是否正确、端口是否可达、TLS 是否握手成功、最后检查 HTTP 状态码与应用数据。实际排障不必严格按顺序，但分层可以防止遗漏。
