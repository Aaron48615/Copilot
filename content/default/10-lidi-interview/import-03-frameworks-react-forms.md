---
id: lidi-202609-import-03-frameworks-react-forms
title: React 表单应该用受控还是非受控？
aliases: [React 表单, controlled uncontrolled]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React, 表单, controlled, uncontrolled, 校验]
---

# React 表单应该用受控还是非受控？

## 核心回答

受控表单把输入值放在 React state 里，适合需要即时校验、联动、禁用提交和统一提交的数据；非受控表单让 DOM 保存值，配合 ref 或 FormData 读取，字段很多但不需要每次输入都触发 render 时更轻。文件输入通常只能非受控，不能把 File 放进普通文本 value。实际项目里我会按字段需要混用，但会保持一套清晰的提交和错误状态。

