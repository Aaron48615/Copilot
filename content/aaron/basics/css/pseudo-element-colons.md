---
id: aaron-basic-css-pseudo-element-colons
title: ::after 和 :after 有什么区别
aliases: [请讲讲：::after 和 :after 有什么区别, 关于“::after 和 :after 有什么区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [伪元素, 双冒号, after, 伪类]
---

# ::after 和 :after 有什么区别

## 核心回答

它们都是在元素内容后面生成一个伪元素，配合 content 可以放装饰或做清除浮动。一个冒号是早期 CSS 的写法，两个冒号是后来为了区分伪类和伪元素采用的写法。

对于 before、after、first-line、first-letter 这些老伪元素，浏览器为了兼容通常两种都支持；像 ::selection 这样的新伪元素则要用双冒号。我会统一写 ::after，看到冒号数量就比较容易分清伪类和伪元素。
