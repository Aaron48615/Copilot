---
id: lidi-202609-import-01-html-css-modern-layout-q02
title: Flex 子项为什么会撑破容器？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Flex, Grid, minmax, auto-fit, 布局]
---

# Flex 子项为什么会撑破容器？

## 核心回答

子项默认的最小尺寸可能来自内容本身，长文本或很长的 URL 不愿意缩小。横向布局里给需要收缩的子项 `min-width: 0`，再配合 overflow 或换行规则，通常就能解决。

