---
id: lidi-202609-import-01-html-css-css-clear-float-q01
title: clear: both 是怎么起作用的？
aliases: []
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [float, clear, 伪元素, BFC]
---

# clear: both 是怎么起作用的？

## 核心回答

它要求当前元素排到前面左右浮动元素的下方。把这样的伪元素放在父元素末尾，就能让父元素的高度延伸到浮动元素下面。新布局一般直接用 Flex 或 Grid，文字环绕图片时才比较常用 float。

