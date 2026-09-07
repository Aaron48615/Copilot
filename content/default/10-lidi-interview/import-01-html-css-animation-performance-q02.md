---
id: lidi-202609-import-01-html-css-animation-performance-q02
title: 怎么判断是 JS 还是 CSS 卡？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [动画, transform, opacity, 合成层, 性能]
---

# 怎么判断是 JS 还是 CSS 卡？

## 核心回答

录一段实际操作，看主线程时间线。如果有很长的脚本任务，先拆计算或减少重复渲染；如果脚本不重但绘制区域很大，再检查阴影、滤镜、布局和图片。不要只凭“看起来卡”猜原因。

