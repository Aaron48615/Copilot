---
id: aaron-basic-html-inline-block-elements
title: 行内元素和块级元素有什么区别，怎么转换
aliases: [请讲讲：行内元素和块级元素有什么区别，怎么转换, 关于“行内元素和块级元素有什么区别，怎么转换”，你会怎样回答？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [行内元素, 块级元素, inline-block]
---

# 行内元素和块级元素有什么区别，怎么转换

## 核心回答

块元素是独占一行的，默认宽度一般是容器可用宽度，可以设置宽高和内外边距，可以容纳其他的行元素和块元素。

常见的块元素有h1~h6，div，p，ul，li，ol，dl，dt，dd，table，form。

行元素和其他元素在一行上，宽度由内容撑开，不可以设置宽高，一般也不能设置左右的内外边距，只能容纳文本或其他行元素。

常见的行元素有span，a，img，button，input，select。

要想让元素能设置宽高的同时，能和其他元素在一行上，可以设置成inline-block。
