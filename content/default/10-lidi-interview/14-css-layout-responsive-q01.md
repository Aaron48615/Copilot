---
id: lidi-202609-css-layout-responsive-q01
title: 如何实现一个元素水平垂直居中？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [CSS3, Flex, Grid, 盒模型, position, z-index, rem, vw, 适配]
---

# 如何实现一个元素水平垂直居中？

## 核心回答

1. 如果父元素使用 Flex，可以写 `display: flex; justify-content: center; align-items: center;`。
2. 如果元素有明确尺寸，也可以使用绝对定位配合 `transform: translate(-50%, -50%)`。
3. 如果是简单的单行文字，可以使用合适的 `line-height`，但它不适合复杂内容或多行文字。
4. 实际选择取决于元素是否需要参与正常布局。弹窗、遮罩里的内容可以用定位，普通页面内容更适合 Flex 或 Grid。

