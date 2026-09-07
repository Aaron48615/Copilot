---
id: lidi-202609-import-02-javascript-microtask-render
title: 微任务、宏任务和浏览器渲染机会怎么排？
aliases: [事件循环, 微任务宏任务, 浏览器渲染时机]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [event loop, 微任务, 宏任务, 渲染]
---

# 微任务、宏任务和浏览器渲染机会怎么排？

## 核心回答

脚本或一个宏任务执行完后，浏览器通常会清空当前微任务队列，再决定是否进入渲染，随后取下一个宏任务；Promise.then 和 queueMicrotask 属于微任务，setTimeout、用户事件和网络回调属于宏任务。具体渲染时机由浏览器调度，不应把它背成绝对顺序。微任务里不断排新微任务可能饿死渲染，所以长计算要拆分或交给 worker。
