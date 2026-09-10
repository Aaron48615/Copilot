---
id: aaron-basic-css-property-order
title: CSS 属性一般按什么顺序写
aliases: [请讲讲：CSS 属性一般按什么顺序写, 关于“CSS 属性一般按什么顺序写”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [CSS属性顺序, 布局, 代码规范]
---

# CSS 属性一般按什么顺序写

## 核心回答

我会按布局、盒子尺寸、文字、装饰效果这个顺序写。先放 display、position、overflow 这些决定怎么排的属性，再放 width、height、margin、padding、border，然后写 font、color、text-align，最后放圆角、阴影、动画和 cursor 这些效果。

这样看一段样式时，能先知道元素摆在哪、占多大，再看它长什么样。不过这个顺序是为了阅读和团队统一，不是浏览器必须遵守的格式；同一个属性写了多次时，声明先后仍然可能影响结果。
