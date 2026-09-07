---
id: lidi-202609-import-01-html-css-css-bfc-q01
title: 两个兄弟元素各自创建 BFC，margin 就不会合并吗？
aliases: []
category: current-interview
difficulty: 必问
priority: high
projects: []
keywords: [BFC, 清除浮动, margin合并, overflow]
---

# 两个兄弟元素各自创建 BFC，margin 就不会合并吗？

## 核心回答

不一定。创建 BFC 主要隔开的是内部和外部的 margin；普通块级兄弟元素之间仍可能合并。可以把其中一个元素放进独立的 BFC 容器，或者直接用 Flex、Grid 和 gap 来安排间距。

