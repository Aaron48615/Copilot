---
id: lidi-202609-import-01-html-css-accessibility-form-q01
title: 什么时候使用 aria？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [label, aria, focus, 表单, 可访问性]
---

# 什么时候使用 aria？

## 核心回答

原生元素已经表达清楚时不额外加 ARIA。自定义组件确实需要补充名称、状态或关系时才用，比如图标按钮加 `aria-label`、错误提示用 `aria-describedby`。ARIA 不能替代键盘行为和焦点管理。

