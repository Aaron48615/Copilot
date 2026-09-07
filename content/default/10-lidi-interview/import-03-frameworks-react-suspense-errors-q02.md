---
id: lidi-202609-import-03-frameworks-react-suspense-errors-q02
title: Suspense 能自动处理所有请求吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [lazy, Suspense, ErrorBoundary, chunk]
---

# Suspense 能自动处理所有请求吗？

## 核心回答

不能。它需要数据层或框架把“等待”接入 Suspense 协议，普通 useEffect fetch 不会自动让最近的 Suspense fallback 出现。项目要明确采用哪种数据获取方式。

