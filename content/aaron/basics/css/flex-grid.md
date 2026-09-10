---
id: aaron-basic-css-flex-grid
title: Flex 和 Grid 怎么根据场景选择？
aliases: [Flex 和 Grid 分别适合什么布局？, 什么时候用弹性布局，什么时候用网格布局？]
category: css
difficulty: 基础
priority: high
projects: []
keywords: [Flex, Grid, 一维布局, 二维布局]
---

# Flex 和 Grid 怎么根据场景选择？

## 核心回答

像导航栏、输入框旁边放按钮这种布局，我更喜欢用 Flex，排列和分配剩余空间都比较直接。比如输入框占剩余空间，按钮按内容宽度显示，就很好表达。

如果是多行卡片，上下的列又要对齐，我就更偏向 Grid，先把列宽和间距定好，再让卡片放进去，写起来比较清楚。Flex 虽然也能换行，但每一行是分别分配空间的，不一定能把上下两行的列对齐。

它们也可以一起用，比如外面卡片列表用 Grid，每张卡片里的按钮区用 Flex。这样每一层都用适合自己的布局，没必要整页只选一种。
