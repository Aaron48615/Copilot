---
id: lidi-202609-import-01-html-css-focus-dialog-q01
title: 焦点陷阱为什么不能只监听 Tab？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [focus, focus-visible, dialog, 键盘, ARIA]
---

# 焦点陷阱为什么不能只监听 Tab？

## 核心回答

还要考虑弹窗里没有可聚焦元素、动态增删按钮、嵌套弹窗、Shift+Tab 和组件卸载。只在 keydown 里硬跳索引，容易把 disabled、hidden 或 shadow DOM 元素算进去。实现时先收集当前可聚焦节点，找不到就把焦点放到标题或容器，再通过键盘测试验证。

