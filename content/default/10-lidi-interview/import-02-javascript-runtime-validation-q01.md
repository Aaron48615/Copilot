---
id: lidi-202609-import-02-javascript-runtime-validation-q01
title: 哪些数据值得完整校验？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [运行时校验, zod, unknown, API]
---

# 哪些数据值得完整校验？

## 核心回答

登录、订单、权限、支付金额这类会影响安全或业务结果的数据必须认真校验。普通展示字段可以按风险分层，但至少要防止页面因为一个字段类型异常直接崩掉。
