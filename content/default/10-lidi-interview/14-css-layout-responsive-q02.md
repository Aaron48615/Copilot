---
id: lidi-202609-css-layout-responsive-q02
title: 盒模型是什么？`box-sizing` 有什么作用？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [CSS3, Flex, Grid, 盒模型, position, z-index, rem, vw, 适配]
---

# 盒模型是什么？`box-sizing` 有什么作用？

## 核心回答

1. 一个元素的盒模型包括内容区、内边距、边框和外边距。
2. `content-box` 下，设置的 `width` 只包括内容区，实际占用宽度还要加上 padding 和 border。
3. `border-box` 下，设置的 `width` 包括内容区、padding 和 border，做表单和响应式布局时通常更容易控制。
4. 我一般会在项目全局设置统一的 `box-sizing`，避免不同组件因为盒模型不同出现尺寸计算问题。

