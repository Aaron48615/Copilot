---
id: lidi-202609-import-03-frameworks-react-suspense-errors
title: React 的懒加载失败和错误边界怎么处理？
aliases: [React lazy 错误边界, Suspense loading, chunk 加载失败]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [lazy, Suspense, ErrorBoundary, chunk]
---

# React 的懒加载失败和错误边界怎么处理？

## 核心回答

Suspense 负责组件还没准备好时显示 loading，错误边界负责渲染阶段或懒加载失败时显示兜底页面，它们解决的是两种不同状态。路由页面可以在边界里提供刷新和返回安全页面的按钮，不能让一块页面错误把整个应用变成白屏。

发布新版本时，旧页面可能还在请求已经被删除的 chunk。可以只对识别出的 chunk 错误自动刷新一次，并用 sessionStorage 记录是否已经重试过；如果仍失败，就让错误边界提供手动刷新，避免无限刷新循环。

