---
id: lidi-202609-import-08-coding-promise-all
title: 如何简化实现 Promise.all？
aliases: [手写 Promise.all, Promise.all 实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise.all, 并发, thenable]
---

# 如何简化实现 Promise.all？

## 核心回答

我会先把输入转成可迭代对象，按原顺序为每一项调用 `Promise.resolve`，把结果写回对应下标；全部完成时 resolve，任意一项 reject 就立刻 reject。空输入要立即得到空数组，还要处理 thenable 和迭代过程抛错。实现时不能按完成顺序 push，否则结果顺序会错。

