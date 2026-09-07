---
id: lidi-202609-import-09-system-design-modal-accessibility
title: 设计一个可访问的 Modal，需要哪些行为？
aliases: [Modal 设计, 弹窗焦点管理]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Modal, dialog, 焦点, 可访问性]
---

# 设计一个可访问的 Modal，需要哪些行为？

## 核心回答

打开时把焦点移到对话框内合适的标题或第一个可操作元素，Tab 只能在对话框内循环；关闭时把焦点还给触发按钮。Escape 是否关闭、点击遮罩是否关闭要由场景决定，危险操作不能只靠误触遮罩取消。使用原生 `dialog` 时仍要检查浏览器兼容和焦点行为，使用自定义容器则补上 `role="dialog"`、`aria-modal`、标题关联和背景不可交互。

