---
id: aaron-basic-css-css3-features
title: CSS3 新增了哪些特性
aliases: [请讲讲：CSS3 新增了哪些特性, 关于“CSS3 新增了哪些特性”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [CSS3, Flex, Grid, 动画]
---

# CSS3 新增了哪些特性

## 核心回答

首先，新增了弹性盒布局flex，是现代非常常用的布局方式，也是移动端开发的核心，还有宫格布局grid，主要用来做一些二维布局。

然后，有新增的选择器，比如子元素选择器，有last-child，用来匹配父元素的最后一个子元素，第n个child，nth-child(n)，匹配父元素的第n个子元素，第n个last-child，nth-last-child(n)，匹配的是父元素的倒数第n个子元素，这个n不只可以写数字，还可以写表达式，或者even或odd，表示偶数或奇数。

第三，是多列布局，使用column-count，column-gap，column-rule等属性实现多列布局，常用于实现瀑布流效果，但是现在实现瀑布流，更多会使用gird布局，或者第三方库，比如Masonry.js，还有一些组件库也有瀑布流组件，ant design从6.0版本以后就提供了瀑布流组件。

还有圆角border-radius，阴影text-shadow和box-shadow，渐变属性。

还有动画特效方面，第一个是transition过渡属性，参数有transition-property，要过渡的 CSS 属性，transition-duration，持续时间，transition-timing-function，速度曲线，transition-delay，延迟时间。

第二个是transform 2D转换，包括translate，rotate，scale，skew等。

第三个是animation，会配合这@keyframe使用。
