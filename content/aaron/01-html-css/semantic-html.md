---
id: css-semantic-html
title: 怎么理解语义化标签？
aliases: [语义化的理解, html语义化, 语义化标签好处]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [可访问性, SEO, button, nav, aria]
---

# 怎么理解语义化标签？

## 核心回答

语义化就是根据内容的含义选标签。导航用 nav，文章用 article，操作按钮用 button。这样代码更容易读，浏览器和辅助工具也更容易理解页面结构。

比如 button 自带焦点和键盘操作，div 加点击事件就要自己补这些行为。不是把样式做得像按钮，它就有了按钮的完整功能。

## 追问：纯图标按钮怎么让读屏软件知道用途？

给按钮提供可访问名称，比如 aria-label="关闭弹窗"，同时保留清晰的键盘焦点。图标如果只是装饰，可以对辅助工具隐藏，避免它和按钮名称被重复读出来。
