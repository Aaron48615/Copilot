---
id: lidi-202609-import-01-html-css-stacking-context-q01
title: 为什么 transform 会影响 fixed？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [z-index, 层叠上下文, position, transform]
---

# 为什么 transform 会影响 fixed？

## 核心回答

某些 transform 容器会成为 fixed 后代的包含块，让它不再相对视口定位。页面里如果出现弹窗跟着某个滚动容器走，除了 z-index，也要检查祖先节点有没有 transform。

