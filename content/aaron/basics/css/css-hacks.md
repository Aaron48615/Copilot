---
id: aaron-basic-css-css-hacks
title: CSS Hack 是什么，有哪几种
aliases: [请讲讲：CSS Hack 是什么，有哪几种, 关于“CSS Hack 是什么，有哪几种”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [CSS Hack, IE, 条件注释, 选择器Hack]
---

# CSS Hack 是什么，有哪几种

## 核心回答

CSS Hack 是利用不同浏览器对语法的识别差异，让某些样式只在特定浏览器生效，主要是以前兼容老 IE 时用的。我会分成三类理解：属性级、选择器级和条件注释。

属性级是在属性写法上做区别，比如旧 IE 的星号、下划线 Hack。选择器级是利用选择器的识别差异，比如历史上的 * html、*:first-child+html。条件注释则是在 HTML 里用 IE 的判断语句，按版本加载对应内容。

这三种主要是了解旧项目。现在处理兼容性，我会先确认目标浏览器，再考虑标准写法、特性检测和必要的降级，避免让样式充满难维护的特殊写法。

【典型历史现象是 IE6 能识别星号和下划线属性 Hack，IE7 能识别星号但不能识别下划线；条件注释主要用于旧 IE，不能当作现代浏览器的通用能力。条件注释可以控制 HTML、CSS、JS 的引入，不能决定服务端代码是否执行。】
