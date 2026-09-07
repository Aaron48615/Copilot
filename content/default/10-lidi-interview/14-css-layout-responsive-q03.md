---
id: lidi-202609-css-layout-responsive-q03
title: `position` 有哪些常见值？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [CSS3, Flex, Grid, 盒模型, position, z-index, rem, vw, 适配]
---

# `position` 有哪些常见值？

## 核心回答

1. `static` 是默认定位，不会因为 top、left 等属性移动。
2. `relative` 仍然占据原来的位置，同时可以作为绝对定位子元素的参考。
3. `absolute` 脱离普通文档流，通常相对最近的定位祖先布局。
4. `fixed` 通常相对视口固定，适合悬浮按钮和固定操作栏；`sticky` 会在滚动到指定位置后产生类似固定的效果。

