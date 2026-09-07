---
id: lidi-202609-import-03-frameworks-vue-rendering-list-q01
title: 虚拟列表有什么代价？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Vue, v-for, 虚拟列表, key, 性能]
---

# 虚拟列表有什么代价？

## 核心回答

它只渲染视口附近的行，能降低 DOM 数量，但需要估算行高、处理动态高度、键盘焦点和滚动定位。读屏器、复制全部文本和浏览器查找也可能受影响。数据量不大时，先分页或减少每行工作往往更简单，不能看到“虚拟”两个字就直接上。

