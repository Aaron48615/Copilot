---
id: lidi-202609-import-02-javascript-abort-controller-q02
title: 一个 signal 能复用多次吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [AbortController, fetch, 取消, signal]
---

# 一个 signal 能复用多次吗？

## 核心回答

不能把已经 aborted 的 signal 当成新请求的长期控制器；一旦 abort，它会一直是 aborted。每轮请求创建新的 controller，若需要一次取消多个并行请求，可以把同一个新 signal 传给它们，并在这一轮结束后丢弃 controller。
