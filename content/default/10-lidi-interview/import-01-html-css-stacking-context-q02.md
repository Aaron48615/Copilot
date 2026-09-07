---
id: lidi-202609-import-01-html-css-stacking-context-q02
title: 弹窗应该怎么处理层级？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [z-index, 层叠上下文, position, transform]
---

# 弹窗应该怎么处理层级？

## 核心回答

先约定应用里的层级体系，再把弹窗挂到靠近 body 的容器，避免被卡在业务卡片的层叠上下文里。层级数字本身不应该无限递增，越多越难维护。

