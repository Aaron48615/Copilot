---
id: lidi-202609-import-01-html-css-css-bfc
title: BFC 是什么？有什么用？
aliases: [块级格式化上下文, bfc触发条件, bfc应用, formatting context]
category: current-interview
difficulty: 必问
priority: high
projects: []
keywords: [BFC, 清除浮动, margin合并, overflow]
---

# BFC 是什么？有什么用？

## 核心回答

BFC 可以理解成一块有独立布局规则的区域。它能把内部的浮动元素算进高度，也能阻止内部元素的上下 margin 和外部发生合并。比如父元素里只有浮动的图片，父元素高度可能撑不起来，设置 display: flow-root 就能解决。

常见的创建方式还有浮动、绝对定位、inline-block，以及 overflow 为 hidden 或 auto。单纯为了创建 BFC，我会用 flow-root，避免顺便把溢出的内容裁掉。

