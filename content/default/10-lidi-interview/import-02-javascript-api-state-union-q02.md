---
id: lidi-202609-import-02-javascript-api-state-union-q02
title: 类型安全和接口真实返回不一致怎么办？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, loading, error, success, 联合类型]
---

# 类型安全和接口真实返回不一致怎么办？

## 核心回答

边界处先接 unknown，解析状态和字段，再转换成内部联合类型；解析失败进入 error，而不是用 `as Success` 强行通过。接口合同变更时同时更新 mock、测试和监控，线上发现未知状态也要有可观测记录。
