---
id: lidi-202609-import-03-frameworks-react-suspense-errors-q01
title: 错误边界能捕获事件处理器里的异常吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [lazy, Suspense, ErrorBoundary, chunk]
---

# 错误边界能捕获事件处理器里的异常吗？

## 核心回答

不能自动捕获所有事件回调和异步 Promise 错误。事件处理器需要自己 try/catch 或交给请求层，错误边界主要捕获子树渲染、生命周期和构造过程中的错误。不同来源要分别处理。

