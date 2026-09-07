---
id: lidi-202609-import-01-html-css-stacking-context-q03
title: 怎么用 DevTools 排查？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [z-index, 层叠上下文, position, transform]
---

# 怎么用 DevTools 排查？

## 核心回答

先确认元素本身可见，再检查祖先的 overflow、transform、opacity 和 position。DevTools 的 Layers 或 computed styles 能帮助确认上下文，但最终要从父子层级关系解释清楚，不是只改一个更大的数字。

