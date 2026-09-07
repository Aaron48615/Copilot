---
id: lidi-202609-import-03-frameworks-vue-next-tick-q02
title: nextTick 和 setTimeout 有什么区别？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [nextTick, DOM 更新, 响应式]
---

# nextTick 和 setTimeout 有什么区别？

## 核心回答

nextTick 针对 Vue 自己的更新队列，时机更明确；setTimeout 只是把代码推到后面的宏任务，不能保证你想等的 DOM 更新已经完成。要等浏览器下一帧做视觉测量时，才考虑 requestAnimationFrame。

