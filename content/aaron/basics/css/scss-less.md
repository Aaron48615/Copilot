---
id: aaron-basic-css-scss-less
title: SCSS 和 Less 有什么共同点和区别
aliases: [请讲讲：SCSS 和 Less 有什么共同点和区别, 关于“SCSS 和 Less 有什么共同点和区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [SCSS, Less, 预处理器, 混入]
---

# SCSS 和 Less 有什么共同点和区别

## 核心回答

SCSS 是 Sass 的一种语法，它和 Less 都是 CSS 预处理器，主要是让样式也能使用变量、嵌套、混入和运算，写完再编译成浏览器能识别的 CSS。比如主题颜色统一放进变量里，修改时就不用到处找。

最直观的区别是变量：SCSS 用 $，Less 用 @；插值分别是 #{...} 和 @{...}。SCSS 有 @mixin、@function、@if、@for、@each、@while 等，适合封装和复用样式逻辑；Less 也有混入、守卫和循环能力，不能简单说它不支持条件或循环。两者都能使用 & 表示父选择器，具体嵌套限制要按各自语法来。

【SCSS 的下划线文件是常见的 partial 约定，不是所有文件都必须以下划线开头；模块通常用 @use、@forward 管理。Sass 有 list、map 等数据类型，颜色处理可以用 sass:color 模块，Less 有 spin()。现在两者都可以在构建阶段编译，不需要把区别背成“Sass 必须装 Ruby、Less 必须在浏览器执行”，也不应把执行任意 JavaScript 当作两者共有的标准能力。】
