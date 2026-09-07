---
id: lidi-202609-import-08-coding-promise-all-q02
title: allSettled 什么时候更合适？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise.all, 并发, thenable]
---

# allSettled 什么时候更合适？

## 核心回答

当我需要知道每一项的结果，不能因为一项失败就丢掉其余数据时，会选 allSettled，比如仪表盘多张卡片并行加载。它返回每项的 status 和 value 或 reason，页面可以逐块展示。关键是不要把业务上必须全部成功的流程误用成部分成功。

