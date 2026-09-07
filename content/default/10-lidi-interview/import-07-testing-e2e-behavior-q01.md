---
id: lidi-202609-import-07-testing-e2e-behavior-q01
title: 什么时候可以用 data-testid？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Playwright, E2E, 用户行为, 测试数据]
---

# 什么时候可以用 data-testid？

## 核心回答

当界面没有稳定的可访问名称，或者同一段文本会变化时，`data-testid` 是可以接受的兜底。它应该表达组件的测试契约，不能把内部实现路径写进去。能用 role、label 或用户可见文本定位时，我会优先用这些方式。

