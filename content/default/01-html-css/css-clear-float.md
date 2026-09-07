---
id: css-clear-float
title: 清除浮动有哪些方式？
aliases: [清除浮动, clear both, 浮动塌陷, 高度塌陷]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [float, clear, 伪元素, BFC]
---

# 清除浮动有哪些方式？

## 核心回答

父元素只有浮动子元素时，高度可能撑不起来，后面的内容也可能挤上来。可以给父元素加 display: flow-root，让它的高度包含浮动内容。

老代码里常见 clearfix：在父元素的 ::after 上设置空 content、display: block 和 clear: both。overflow: hidden 也能处理高度问题，但会裁掉溢出内容，比如下拉菜单。

## 追问：clear: both 是怎么起作用的？

它要求当前元素排到前面左右浮动元素的下方。把这样的伪元素放在父元素末尾，就能让父元素的高度延伸到浮动元素下面。新布局一般直接用 Flex 或 Grid，文字环绕图片时才比较常用 float。
