---
id: lidi-202609-import-09-system-design-modal-accessibility-q01
title: 为什么不能只写一个 z-index？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Modal, dialog, 焦点, 可访问性]
---

# 为什么不能只写一个 z-index？

## 核心回答

z-index 只解决视觉层叠，不会阻止背景被键盘或读屏器访问，也不会自动处理焦点回收。还要考虑滚动锁、嵌套弹窗、页面卸载和移动端视口变化。实现后用键盘操作和辅助技术实际走一遍，而不是只看截图。

