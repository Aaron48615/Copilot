---
id: lidi-202609-import-01-html-css-sticky-q01
title: overflow: hidden 一定会让 sticky 失效吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [sticky, overflow, top, 吸顶]
---

# overflow: hidden 一定会让 sticky 失效吗？

## 核心回答

不一定，但它会改变滚动容器和裁剪范围。如果 hidden 的祖先没有实际滚动空间，sticky 的参照就可能不是你以为的页面。需要结合页面结构看，不是看到 hidden 就直接下结论。

