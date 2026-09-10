---
id: aaron-basic-css-center-element
title: 元素怎么在屏幕中间居中
aliases: [请讲讲：元素怎么在屏幕中间居中, 关于“元素怎么在屏幕中间居中”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [居中, Flex, 绝对定位, transform]
---

# 元素怎么在屏幕中间居中

## 核心回答

第一种做法是父元素使用flex布局，align-item和justify-content都设置成center。

第二种做法是父元素相对定位，子元素绝对定位，left和top都设置50%，再用transform平移，x轴y轴都是-50%。但是要是已知宽高的话，可以不用transform，可以设置子元素的左外边距和上外边距为负的自身的一半。

还有第三种写法，是让父元素使用table-cell布局，然后text-align设置为center，vertical-align为middle。
