---
id: aaron-basic-css-position-values
title: position 的取值和区别
aliases: [请讲讲：position 的取值和区别, 关于“position 的取值和区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [position, absolute, fixed, sticky]
---

# position 的取值和区别

## 核心回答

position 常见的有 static、relative、absolute、fixed 和 sticky。static 是默认的正常布局，top、left 这些定位偏移不生效。relative 也是保留原来的位置，再相对自己原来的位置偏移，还经常用来给绝对定位的子元素提供参照。

absolute 会脱离正常文档流，一般相对最近的非 static 祖先定位；没有这样的祖先时，就相对初始包含块。fixed 也脱离文档流，通常相对视口定位，比如固定底栏。sticky 则先参与正常布局，滚动达到设置的 top 等阈值后开始吸附，但仍受滚动容器和父级范围限制。

【transform 等属性也可能建立 absolute 或 fixed 的包含块，所以 fixed 不一定永远以视口为参照。全局关键字里，inherit 明确继承父元素的值，initial 使用初始值；position 不继承，所以 unset 的效果是 static，并不会根据父元素有没有设置定位来决定。】
