---
id: css-new-features
title: CSS3 有哪些新特性？
aliases: [css3新特性, css新增属性, css3]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [选择器, 圆角, 动画, flex]
---

# CSS3 有哪些新特性？

## 核心回答

常见的有圆角、阴影、渐变、transform、transition 和 animation。比如卡片悬浮时轻轻上移，可以用 transform 配合 transition；需要循环播放的加载动画，可以用 @keyframes。

布局方面，Flex 适合一行或一列的排列，Grid 适合同时安排多行多列。媒体查询可以根据屏幕尺寸调整布局。现在 CSS 分模块发展，讨论具体能力比只说“CSS3”更清楚。

## 追问：CSS 变量和 Sass 变量有什么不同？

CSS 自定义属性留在浏览器里，可以参与继承，也能用 JavaScript 动态修改，适合主题切换。Sass 变量通常在构建时就被替换成具体值，主要用来组织样式源码。
