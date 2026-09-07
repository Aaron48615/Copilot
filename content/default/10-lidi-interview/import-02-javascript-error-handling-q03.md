---
id: lidi-202609-import-02-javascript-error-handling-q03
title: 全局捕获能代替局部处理吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [错误处理, Promise, try catch, 兜底]
---

# 全局捕获能代替局部处理吗？

## 核心回答

不能。全局捕获适合记录漏网错误和展示最后的兜底页面，但它不知道这个请求是搜索、支付还是保存表单，无法做准确的恢复。关键业务仍然需要在请求或页面层处理，保证用户知道下一步怎么办。
