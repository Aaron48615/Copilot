---
id: lidi-202609-import-04-browser-network-engineering-monitoring-q02
title: 监控数据很多时怎么控制成本？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [监控, source map, 采样, 告警]
---

# 监控数据很多时怎么控制成本？

## 核心回答

我会按错误严重度和用户影响做采样，重复堆栈合并，性能数据分层采样，关键转化链路保留更高比例。采样规则本身也要可配置，并用少量全量基线校验是否漏掉了长尾问题。告警看趋势和用户影响，避免某个低价值错误把真正的故障淹没。

