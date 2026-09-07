---
id: lidi-202609-import-08-coding-debounce
title: 手写一个支持取消和 flush 的 debounce
aliases: [手写防抖, debounce 实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [debounce, 防抖, cancel, flush]
---

# 手写一个支持取消和 flush 的 debounce

## 核心回答

我会返回一个包装函数，并把 timer、最近一次参数和上下文关在闭包里。每次调用先清掉旧 timer，再按 wait 重新计时；到点时用最后一次参数执行。`cancel` 清 timer 并丢弃参数，`flush` 如果还有待执行调用就立即执行并清理。若要支持 leading、trailing，最好把选项和边界写清楚，再用 fake timer 验证第一次调用、连续调用和取消。

