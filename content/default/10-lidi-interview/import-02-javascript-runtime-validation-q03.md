---
id: lidi-202609-import-02-javascript-runtime-validation-q03
title: 校验失败要不要自动重试？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [运行时校验, zod, unknown, API]
---

# 校验失败要不要自动重试？

## 核心回答

格式不对不是网络问题，重试同一份响应通常没有意义。记录接口、版本和响应摘要帮助排查即可，敏感字段不要直接写日志。
