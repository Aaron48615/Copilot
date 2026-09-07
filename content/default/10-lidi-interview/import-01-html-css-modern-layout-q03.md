---
id: lidi-202609-import-01-html-css-modern-layout-q03
title: 什么时候不该继续加 CSS？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Flex, Grid, minmax, auto-fit, 布局]
---

# 什么时候不该继续加 CSS？

## 核心回答

如果布局已经靠很多负 margin、绝对定位和特殊断点勉强对齐，我会停下来重看 DOM 结构和布局模型。先把父子关系和尺寸约束理清，比继续堆选择器更可靠。

