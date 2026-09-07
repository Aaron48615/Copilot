---
id: lidi-202609-import-08-coding-virtual-list-q01
title: 为什么需要 overscan？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [虚拟列表, scrollTop, overscan, 行高]
---

# 为什么需要 overscan？

## 核心回答

只渲染刚好在视口内的行，快速滚动时容易出现白屏。前后多渲染几行可以给浏览器和 React/Vue 留出准备时间，代价是多一点 DOM。overscan 应按行高、滚动速度和设备测量，过大就失去虚拟化意义。

