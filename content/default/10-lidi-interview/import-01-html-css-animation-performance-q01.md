---
id: lidi-202609-import-01-html-css-animation-performance-q01
title: requestAnimationFrame 解决什么问题？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [动画, transform, opacity, 合成层, 性能]
---

# requestAnimationFrame 解决什么问题？

## 核心回答

它让 JavaScript 更新尽量对齐浏览器下一帧，适合自己计算拖动或 canvas 动画。它不能让昂贵计算变快，也不能把本来会触发布局的改动变成合成动画，计算量仍要控制。

