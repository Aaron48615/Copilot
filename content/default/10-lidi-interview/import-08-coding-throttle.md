---
id: lidi-202609-import-08-coding-throttle
title: 手写 throttle 时 leading、trailing 和取消怎么定义？
aliases: [手写节流, throttle 实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [throttle, 节流, leading, trailing]
---

# 手写 throttle 时 leading、trailing 和取消怎么定义？

## 核心回答

节流的目标是在时间窗口内最多执行一次。实现前先定清楚 leading 是否立即执行、trailing 是否在窗口结束补最后一次，以及 cancel 和 flush 的行为；否则不同实现都可能被叫作 throttle。闭包里保存最近参数、上次执行时间和定时器，执行后清理引用。滚动监听常用节流，但滚动结束还要不要补一次，取决于业务是否需要最终位置。

