---
id: lidi-202609-import-03-frameworks-vue-next-tick-q03
title: watch 里要不要再 nextTick？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [nextTick, DOM 更新, 响应式]
---

# watch 里要不要再 nextTick？

## 核心回答

默认 watch 回调的时机不一定是 DOM 更新之后。如果确实需要读取更新后的 DOM，可以给 watch 设置 flush: 'post'，或在回调里使用 nextTick。先说明自己需要的是数据变化还是 DOM 变化，再选方式。

