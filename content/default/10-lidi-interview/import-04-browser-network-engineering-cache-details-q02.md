---
id: lidi-202609-import-04-browser-network-engineering-cache-details-q02
title: 用户私有接口能不能放 CDN？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Cache-Control, ETag, Last-Modified, CDN, 缓存]
---

# 用户私有接口能不能放 CDN？

## 核心回答

必须明确响应是否包含用户数据、Cookie、Authorization 和 Vary 规则。私有响应默认不共享缓存，若确实要缓存，要按用户或权限隔离并防止误命中。缓存键、失效和越权测试比“响应快了多少”更重要。

