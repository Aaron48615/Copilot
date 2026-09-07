---
id: lidi-202609-css-layout-responsive-q05
title: `rem`、`vw` 和媒体查询怎么选择？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [CSS3, Flex, Grid, 盒模型, position, z-index, rem, vw, 适配]
---

# `rem`、`vw` 和媒体查询怎么选择？

## 核心回答

1. `vw` 直接和视口宽度相关，适合根据屏幕宽度缩放的移动端页面。
2. `rem` 依赖根元素字体大小，适合统一控制页面的尺寸比例，但需要设计好根字体计算方式。
3. 媒体查询适合在不同断点改变布局结构，比如小屏幕一列、大屏幕两列，而不只是缩放尺寸。
4. 实际项目可以组合使用：尺寸用相对单位，布局结构用 Flex/Grid 和媒体查询，再对极端宽度做最小和最大限制。

