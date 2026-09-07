---
id: lidi-202609-import-08-coding-promise-all-q01
title: 失败后其他任务会停止吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise.all, 并发, thenable]
---

# 失败后其他任务会停止吗？

## 核心回答

标准 Promise.all 只负责尽快把组合 Promise 置为 rejected，不会自动取消已经发出的任务。若任务支持 AbortSignal，业务层可以在首个失败时统一 abort；不支持取消的任务仍可能在后台完成，所以资源清理和副作用要另行处理。

