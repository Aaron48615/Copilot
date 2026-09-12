---
id: aaron-basic-css-length-units
title: px、em 和 rem 有什么区别
aliases: [请讲讲：px、em 和 rem 有什么区别, 关于“px、em 和 rem 有什么区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [px, em, rem]
---

# px、em 和 rem 有什么区别

## 核心回答

px 是 CSS 像素，用它写尺寸比较直接，但一个 CSS 像素不一定对应一个物理屏幕像素。rem 是相对根元素 html 的字号，比如根字号是 16px，2rem 就是 32px，整页参照比较统一，适合跟根字号一起做尺寸适配。

em 要看写在哪个属性上：设置 font-size 时，它相对父元素的字号；设置 padding、width 等属性时，一般相对元素自己的字号。这样按钮的内边距就可以跟着文字大小一起变化，但多层嵌套字号时也要注意累积放大的问题。

### `1px` 是绝对长度吗

CSS 规范把 `px` 归为绝对长度单位，但对屏幕输出而言，它是一个**参考像素/视角单位**，不等于固定的屏幕物理点。
