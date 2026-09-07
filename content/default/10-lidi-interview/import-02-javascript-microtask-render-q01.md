---
id: lidi-202609-import-02-javascript-microtask-render-q01
title: MutationObserver 在哪一类？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [event loop, 微任务, 宏任务, 渲染]
---

# MutationObserver 在哪一类？

## 核心回答

它的回调也在微任务检查阶段触发，通常会在当前脚本改完 DOM 后、浏览器下一次渲染前执行。大量同步 DOM 修改会合并通知，但回调里继续改 DOM 也可能形成循环。使用时要断开观察器，避免组件卸载后仍然持有节点。
