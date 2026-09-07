---
id: lidi-202609-import-01-html-css-focus-dialog
title: 弹窗和下拉菜单的焦点管理怎么做？
aliases: [焦点陷阱, focus-visible, 下拉菜单可访问性]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [focus, focus-visible, dialog, 键盘, ARIA]
---

# 弹窗和下拉菜单的焦点管理怎么做？

## 核心回答

弹窗打开后焦点要进入弹窗，Tab 只能在可交互元素里循环，Escape 按约定关闭，关闭后焦点回到触发按钮；下拉菜单还要处理箭头键、当前项和点击外部。优先使用原生 button、dialog、select 等语义，再补 `aria-expanded`、`aria-controls` 和标签关联。`focus-visible` 可以让键盘用户看到焦点样式，同时避免鼠标点击出现不必要的描边。

