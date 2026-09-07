---
id: lidi-202609-import-01-html-css-accessibility-form
title: 前端表单怎么做得更容易使用？
aliases: [表单可访问性, label aria, 表单校验体验]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [label, aria, focus, 表单, 可访问性]
---

# 前端表单怎么做得更容易使用？

## 核心回答

先用原生语义：输入框有对应的 label，按钮用 button，错误信息和具体字段关联。提交失败时把焦点放到第一个有问题的字段，错误文案要告诉用户怎么改，不只说“格式错误”。键盘能完成整条流程，读屏用户才能真正使用。

校验时机也要注意。必填项可以在提交时统一检查，格式错误可以在离开字段后提示；用户正在输入时不要每敲一个字就闪红。异步校验要有 loading、失败和取消，不能让旧结果覆盖新输入。

