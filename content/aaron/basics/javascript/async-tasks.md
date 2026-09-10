---
id: aaron-basic-javascript-async-tasks
title: JS 里有哪些异步任务
aliases: [请讲讲：JS 里有哪些异步任务, 关于“JS 里有哪些异步任务”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [异步任务, Promise, 定时器]
---

# JS 里有哪些异步任务

## 核心回答

常见的有网络请求、定时器回调、用户事件回调，以及 Promise 的 then、catch 和 await 后续代码。浏览器负责处理网络、计时等工作，条件满足后，再把回调安排给 JavaScript 执行，所以等待接口时不用一直占住主线程。

不过“回调函数”不一定就是异步的，比如 map 的回调会同步执行；绑定事件这一步也是同步的，之后用户点击才触发回调。new Promise 的执行器也会立即执行，then 回调才通过微任务调度。判断时我会看具体 API 的执行机制，不只看代码里有没有回调。
