---
id: lidi-202609-import-02-javascript-microtask-render-q02
title: 为什么 await 后的代码常常先于 setTimeout？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [event loop, 微任务, 宏任务, 渲染]
---

# 为什么 await 后的代码常常先于 setTimeout？

## 核心回答

await 后续相当于把 continuation 放进 Promise 微任务队列；当前宏任务结束后会先清微任务，再处理计时器宏任务，所以通常先执行 await 后的代码。若微任务里有重计算，用户仍可能感觉页面卡住，因为渲染机会被推迟了。
