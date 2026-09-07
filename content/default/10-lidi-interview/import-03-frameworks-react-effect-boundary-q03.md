---
id: lidi-202609-import-03-frameworks-react-effect-boundary-q03
title: 请求怎么避免旧结果覆盖新结果？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useEffect, Effect, 副作用, render, 事件]
---

# 请求怎么避免旧结果覆盖新结果？

## 核心回答

每次 Effect 建立请求时创建 AbortController，清理时取消；同时在 resolve 时检查这次请求仍然有效。取消只是减少浪费，结果校验负责防止已经返回的旧响应改掉当前状态。

