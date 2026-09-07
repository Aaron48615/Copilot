---
id: lidi-202609-import-01-html-css-sticky
title: position: sticky 什么时候会失效？
aliases: [sticky 不生效, 粘性定位, 吸顶]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [sticky, overflow, top, 吸顶]
---

# position: sticky 什么时候会失效？

## 核心回答

sticky 是“在正常位置和固定位置之间切换”的定位方式。它必须指定一个阈值，比如 `top: 0`，并且滚动容器要有足够的空间。滚动时它会相对最近的滚动祖先吸住，不是永远相对窗口。

最常见的问题是祖先设置了不合适的 overflow，或者 sticky 元素所在容器高度不够；Flex 子项还可能因为默认的拉伸和高度约束看起来像没有吸顶。排查时我会先找真正滚动的容器，再确认 top、尺寸和层级。

