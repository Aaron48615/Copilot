---
id: lidi-202609-javascript-core-q06
title: 事件循环、宏任务和微任务是什么？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# 事件循环、宏任务和微任务是什么？

## 核心回答

1. JavaScript 主线程一次执行一个任务。同步代码会先执行，异步回调会进入任务队列，等调用栈空了以后再执行。
2. 常见宏任务有定时器、脚本和部分 I/O 回调；Promise 的回调属于微任务，`queueMicrotask` 也属于微任务。
3. 一轮同步代码执行完以后，通常会先清空微任务，再进入下一个宏任务。所以 `Promise.then` 往往会先于 `setTimeout(..., 0)` 执行。
4. 理解这个顺序对接口加载、状态更新和调试很有帮助，但我不会把它说成“所有浏览器所有场景都完全一样”，具体还要看任务来源和浏览器调度。

