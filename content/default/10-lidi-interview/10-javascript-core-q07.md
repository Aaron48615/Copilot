---
id: lidi-202609-javascript-core-q07
title: Promise 和 `async/await` 怎么处理错误？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# Promise 和 `async/await` 怎么处理错误？

## 核心回答

1. Promise 可以通过 `.catch()` 接收前面链路的异常；`async/await` 通常放在 `try/catch` 中，让异步代码看起来更接近同步流程。
2. 我会把请求失败、业务状态失败和数据格式错误区分开。HTTP 请求成功不代表业务一定成功，返回数据也不一定符合页面需要。
3. 在多个接口并行时，如果必须全部成功，可以使用 `Promise.all`；如果允许部分失败，可以使用 `Promise.allSettled` 或者分别处理。
4. 错误处理以后还要更新 loading 状态，不能因为异常提前 return 就让页面一直显示加载中。

