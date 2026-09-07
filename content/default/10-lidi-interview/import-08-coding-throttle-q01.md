---
id: lidi-202609-import-08-coding-throttle-q01
title: debounce 和 throttle 怎么选？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [throttle, 节流, leading, trailing]
---

# debounce 和 throttle 怎么选？

## 核心回答

搜索输入通常希望用户停下来后只请求一次，用 debounce；滚动、拖拽和窗口 resize 需要持续响应但不能每个事件都计算，用 throttle。两者都不能替代请求取消或结果版本校验，选择时还要看操作是否需要最后一次 trailing 调用。

