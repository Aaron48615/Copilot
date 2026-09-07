---
id: lidi-202609-import-01-html-css-stacking-context
title: z-index 为什么有时候不生效？
aliases: [层叠上下文, stacking context, fixed 被遮挡]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [z-index, 层叠上下文, position, transform]
---

# z-index 为什么有时候不生效？

## 核心回答

`z-index` 不是全页面统一比数字，它先在各自的层叠上下文里排序。父元素如果形成了一个层叠上下文，里面的子元素再怎么把 z-index 写成 9999，也不能跑到父元素这一层上下文之外。

常见形成条件有 position 配合 z-index、fixed、opacity 小于 1、transform、filter、isolation 等。排查时我会从目标元素一路往上看父元素，找出哪个上下文把它限制住，再决定调整父层级还是把弹层挂到更合适的位置。

