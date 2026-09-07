---
id: lidi-202609-import-08-coding-debounce-q02
title: 搜索框里为什么还要取消请求？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [debounce, 防抖, cancel, flush]
---

# 搜索框里为什么还要取消请求？

## 核心回答

防抖只能减少请求次数，不能保证已经发出的旧请求先结束。搜索输入变化时还要 AbortController 或请求序号保护，防止旧结果覆盖新结果。两者解决的是不同问题，通常一起使用。

