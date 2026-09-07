---
id: lidi-202609-import-08-coding-concurrency-pool-q02
title: 如何验证没有超出上限？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [并发池, 限流, Promise, worker]
---

# 如何验证没有超出上限？

## 核心回答

测试任务开始时把 active 加一，结束时减一，并记录最大值，断言它永远不大于 limit。再用延迟可控的任务验证结果顺序、空任务、任务抛错和取消。不要只断言最终数组，因为那看不出中途是否曾经超限。

