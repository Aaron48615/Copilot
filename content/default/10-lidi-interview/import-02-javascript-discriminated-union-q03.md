---
id: lidi-202609-import-02-javascript-discriminated-union-q03
title: 接口成功但业务失败怎么表达？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [联合类型, 状态机, loading, error, TypeScript]
---

# 接口成功但业务失败怎么表达？

## 核心回答

HTTP 成功不代表业务成功。响应类型里可以把 `success: true` 和 `success: false` 做成可辨识联合；请求层先处理网络和 HTTP 错误，业务层再处理接口返回的业务错误，别把两种失败混成一个字符串。
