---
id: lidi-202609-import-01-html-css-css-triangle
title: 用 CSS 画一个三角形？
aliases: [css三角形, border三角形, clip-path]
category: current-interview
difficulty: 亮点
priority: high
projects: []
keywords: [border, 三角形, clip-path]
---

# 用 CSS 画一个三角形？

## 核心回答

最经典的是用 border 画。把元素的宽高都设成 0，四个方向给比较粗的 border，不要的方向颜色设成 transparent，只给目标方向上色。原理是相邻两条 border 在角上是对角线拼接的，透明的两条边一压，就切出一个三角形。朝上的三角形就是左右透明、border-bottom 上色。

比如：width: 0; height: 0; border: 40px solid transparent; border-bottom-color: red; 就是一个朝上的实心三角形。

现在也有更直接的做法：clip-path: polygon() 按坐标裁出任意多边形，画带角度的形状更灵活。要带描边的三角形，常见做法是一大一小两个三角形叠在一起。实际项目里聊天气泡的小尖角、下拉框的箭头就是这些方案的典型场景。

