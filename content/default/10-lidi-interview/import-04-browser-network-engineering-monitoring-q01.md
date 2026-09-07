---
id: lidi-202609-import-04-browser-network-engineering-monitoring-q01
title: 怎样避免日志泄露隐私？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [监控, source map, 采样, 告警]
---

# 怎样避免日志泄露隐私？

## 核心回答

上报前先定义字段白名单，过滤 Token、手机号、地址、聊天正文等敏感信息；用户输入和 URL 参数也要做脱敏。生产环境关闭详细调试日志，传输使用 HTTPS，服务端按权限和保留期限管理。出现新字段时走代码评审，不能让 `JSON.stringify(error)` 把整个上下文顺手发出去。

