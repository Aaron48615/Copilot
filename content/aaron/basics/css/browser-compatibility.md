---
id: aaron-basic-css-browser-compatibility
title: 遇到 CSS 兼容问题怎么处理
aliases: [请讲讲：遇到 CSS 兼容问题怎么处理, 关于“遇到 CSS 兼容问题怎么处理”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [CSS兼容性, 特性检测, Autoprefixer]
---

# 遇到 CSS 兼容问题怎么处理

## 核心回答

我会先确认具体的设备、浏览器版本和复现步骤，再看是样式不支持，还是不同环境的默认行为不一样。比如移动端点击链接的高亮，可以按设计需要用 -webkit-tap-highlight-color 调整；软键盘弹出后底栏偏移，就要检查视口变化和 fixed 的定位参照，不能直接认为所有手机表现都相同。

还有一些看着像兼容问题，其实是布局规则。比如图片之间的空隙可能来自行内元素间的空白，图片下方的空隙可能来自基线对齐，可以分别用 Flex 布局、去掉空白、display: block 或调整 vertical-align 处理。圆角裁切也要检查图片自己的圆角、父元素的 overflow 和层级。

【老 IE 的图片链接边框、inline-block 和 rgba 支持问题，属于历史兼容范围；opacity 会让整个元素连同子内容一起透明，不能完全代替 rgba 的背景透明。移动端 300ms 点击延迟也不能当作所有现代浏览器的固定行为。前缀可以交给 Autoprefixer 按目标浏览器处理，常见历史前缀有 -webkit-、-moz-、-ms-、-o-。唤起软键盘通常要放在真实用户操作链路里；iScroll 是旧方案，不是遇到 fixed 问题就必须引入。】
