---
id: aaron-basic-css-link-import
title: link 和 @import 引入 CSS 有什么区别
aliases: [请讲讲：link 和 @import 引入 CSS 有什么区别, 关于“link 和 @import 引入 CSS 有什么区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [link, @import, CSS加载]
---

# link 和 @import 引入 CSS 有什么区别

## 核心回答

link 是 HTML 标签，@import 是 CSS 里的引入语法。link 在浏览器解析 HTML 时就能被发现并开始加载；@import 要先拿到并解析包含它的样式表，才知道还要加载哪些 CSS，所以嵌套导入可能拉长资源发现的链路，并不是一定等整个页面加载完才开始。

页面主样式我通常会用 link，加载关系更直观，也能配置 media 等属性。两种方式都能引入样式，但不存在 link 的样式权重天然比 @import 高的规则，最终还是按层叠顺序、选择器权重等决定。

【link 除了样式表，还能用于图标、预加载等资源关系；@import 是导入样式规则。编译阶段的 Sass 模块导入和浏览器运行时的 CSS @import 也不是一回事。】
