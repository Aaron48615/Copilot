---
id: lidi-202609-react-q04
title: 受控组件和非受控组件有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [React19, Hooks, useEffect, Redux Toolkit, memo, 受控组件]
---

# 受控组件和非受控组件有什么区别？

## 核心回答

1. 受控组件的值由 React 状态管理，输入变化通过 `onChange` 更新状态，页面显示和状态是一致的。
2. 非受控组件主要由 DOM 自己保存值，通过 ref 在需要时读取，代码更简单，但实时校验和联动会少一些。
3. 表单需要实时校验、条件显示或提交前统一处理时，我更倾向于受控组件。
4. 文件上传、简单的一次性输入等场景可以考虑非受控方式，最终还是看交互复杂度。

