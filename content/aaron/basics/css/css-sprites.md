---
id: aaron-basic-css-css-sprites
title: 雪碧图是什么，适合什么场景
aliases: [请讲讲：雪碧图是什么，适合什么场景, 关于“雪碧图是什么，适合什么场景”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [雪碧图, background-position, HTTP请求]
---

# 雪碧图是什么，适合什么场景

## 核心回答

雪碧图就是把多个小图合并成一张图片，通过 background-position 控制显示哪一块。这样页面里有很多小图标时，可以共用一次图片请求，减少请求次数。

它比较适合内容固定、经常一起使用的小图标。代价是维护坐标和尺寸比较麻烦，改一张小图也可能要重新生成整张图。现在还可以根据情况选择 SVG 图标、按需加载的图片，不能只因为请求少了就认定一定更快。
