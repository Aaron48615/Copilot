---
id: lidi-202609-import-01-html-css-focus-dialog-q02
title: ARIA 能解决所有问题吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [focus, focus-visible, dialog, 键盘, ARIA]
---

# ARIA 能解决所有问题吗？

## 核心回答

ARIA 只补充语义，不会自动增加键盘行为、焦点移动或状态管理；错误的 role 反而会误导读屏器。能用原生元素就不用 ARIA 伪造，使用自定义组件时同时实现语义、交互和视觉焦点，最后用自动化工具和人工读屏检查。

