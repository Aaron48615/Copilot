---
id: lidi-202609-import-08-coding-virtual-list-q02
title: 虚拟列表如何保证可访问性？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [虚拟列表, scrollTop, overscan, 行高]
---

# 虚拟列表如何保证可访问性？

## 核心回答

可见窗口之外的内容不在 DOM，读屏器和浏览器查找不会自动拿到完整列表。需要提供总数、当前位置和键盘移动语义，焦点移出窗口时及时滚动到对应项；如果用户必须连续阅读所有内容，分页或普通列表可能更合适。

