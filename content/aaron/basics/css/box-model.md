---
id: aaron-basic-css-box-model
title: 怎么理解盒模型
aliases: [请讲讲：怎么理解盒模型, 关于“怎么理解盒模型”，你会怎样回答？]
category: css
difficulty: 基础
priority: high
projects: []
keywords: [盒模型, content-box, border-box]
---

# 怎么理解盒模型

## 核心回答

盒模型可以从里到外看成内容、内边距 padding、边框 border 和外边距 margin。常说的两种盒模型，主要区别是设置的 width 和 height 到底包含哪些部分。

content-box 是标准盒模型，width 只算内容宽度，实际边框盒宽度还要加上左右 padding 和 border。border-box 则把内容、padding 和 border 都算进 width 里，所以写 200px，整个边框盒通常就是 200px。margin 在这两种情况下都另外计算。

我觉得 border-box 在做布局时比较方便，比如卡片宽度已经定好了，再加内边距就不容易把布局撑开。它是现代 CSS 可以主动选择的方式，不只是旧 IE 才有的行为。
