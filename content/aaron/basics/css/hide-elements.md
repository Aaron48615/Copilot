---
id: aaron-basic-css-hide-elements
title: 三种隐藏方式有什么区别
aliases: [请讲讲：三种隐藏方式有什么区别, 关于“三种隐藏方式有什么区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [display, visibility, opacity]
---

# 三种隐藏方式有什么区别

## 核心回答

display: none 会让元素不参与布局，原来的位置也不保留，但元素还在 DOM 里。visibility: hidden 是看不见但仍然占位，隐藏部分通常不能被点击。opacity: 0 是完全透明，也保留位置，而且默认还可以被点击，所以做淡入淡出时，要一起考虑它会不会挡住下面的操作。

如果需要隐藏后让其他内容补上位置，可以用 display: none；希望布局不动，可以考虑 visibility；需要透明度动画，就用 opacity，再按需要控制 pointer-events 和键盘焦点。

【visibility 可以被子元素重新设为 visible，所以子元素可能重新显示并接收点击。这里比较的是用户正常点击和焦点行为，不是说隐藏之后代码就绝对不能派发事件。】
