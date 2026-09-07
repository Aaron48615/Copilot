---
id: lidi-202609-import-03-frameworks-react-suspense-errors-q03
title: 为什么错误页面要有 resetKey？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [lazy, Suspense, ErrorBoundary, chunk]
---

# 为什么错误页面要有 resetKey？

## 核心回答

用户切换路由或数据范围后，原来的错误上下文可能已经失效。用稳定的 key 变化触发边界重置，可以让新页面重新尝试加载，而不是一直停在旧错误上。

