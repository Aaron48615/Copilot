---
id: lidi-202609-import-01-html-css-animation-performance
title: CSS 动画卡顿时怎么排查？
aliases: [动画性能, transform opacity, 合成层]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [动画, transform, opacity, 合成层, 性能]
---

# CSS 动画卡顿时怎么排查？

## 核心回答

我先看动画到底改了什么属性。transform 和 opacity 通常更容易交给合成阶段处理，改宽高、top、left 往往会触发布局和绘制，连续执行时更容易卡。这个不是绝对规则，最终还是用 Performance 面板看有没有长任务、重排或大量绘制。

也不会给所有元素都加 `will-change`。它会提前占资源，长期滥用反而变慢。动画结束后如果只是一次性的效果，应该让浏览器恢复正常状态，并为不喜欢动效的用户提供 prefers-reduced-motion 方案。

