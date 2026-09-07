---
id: lidi-202609-import-02-javascript-runtime-validation-q02
title: 校验应该放在哪一层？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [运行时校验, zod, unknown, API]
---

# 校验应该放在哪一层？

## 核心回答

靠近边界的请求层先做通用结构检查，进入领域逻辑后再做业务规则校验。这样组件拿到的是相对可信的数据，业务判断也不会散落在每个模板里。
