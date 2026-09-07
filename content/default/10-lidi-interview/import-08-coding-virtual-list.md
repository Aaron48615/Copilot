---
id: lidi-202609-import-08-coding-virtual-list
title: 虚拟列表的核心计算怎么写？
aliases: [手写虚拟列表, virtual list]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [虚拟列表, scrollTop, overscan, 行高]
---

# 虚拟列表的核心计算怎么写？

## 核心回答

固定行高时，`start = floor(scrollTop / rowHeight)`，再加上前后 overscan 得到渲染区间；外层用一个总高度占位，内容通过 translateY 放到 start 对应的位置。滚动时节流计算并限制 start/end 边界，列表项 key 仍然使用业务 id。动态行高要维护测量结果和前缀和，复杂度和滚动定位都会上升，不能用固定公式硬套。

