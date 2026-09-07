---
id: lidi-202609-import-01-html-css-css-clear-float
title: 清除浮动有哪些方式？
aliases: [清除浮动, clear both, 浮动塌陷, 高度塌陷]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [float, clear, 伪元素, BFC]
---

# 清除浮动有哪些方式？

## 核心回答

父元素只有浮动子元素时，高度可能撑不起来，后面的内容也可能挤上来。可以给父元素加 display: flow-root，让它的高度包含浮动内容。

老代码里常见 clearfix：在父元素的 ::after 上设置空 content、display: block 和 clear: both。overflow: hidden 也能处理高度问题，但会裁掉溢出内容，比如下拉菜单。

