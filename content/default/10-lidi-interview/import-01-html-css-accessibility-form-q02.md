---
id: lidi-202609-import-01-html-css-accessibility-form-q02
title: 弹窗打开后焦点怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [label, aria, focus, 表单, 可访问性]
---

# 弹窗打开后焦点怎么处理？

## 核心回答

打开时把焦点移进弹窗，关闭后还给原来触发它的按钮；模态弹窗打开期间，Tab 不应跑到背景内容。Escape 是否关闭要符合组件语义，关闭后仍然清理监听和临时节点。

