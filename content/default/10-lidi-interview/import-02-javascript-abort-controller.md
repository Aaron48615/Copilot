---
id: lidi-202609-import-02-javascript-abort-controller
title: AbortController 取消 fetch 后 Promise 会怎样？
aliases: [取消 fetch, AbortSignal, 请求取消]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [AbortController, fetch, 取消, signal]
---

# AbortController 取消 fetch 后 Promise 会怎样？

## 核心回答

把 `controller.signal` 传给 fetch，调用 abort 后浏览器会尝试终止请求，fetch Promise 通常以 AbortError reject；这不是一个正常的业务成功，也不代表服务端一定没收到请求。catch 里要区分用户主动取消和真正的网络失败，前者一般不弹错误。组件卸载、关键词变化和超时都可以使用同一套取消信号。
