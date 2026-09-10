---
id: aaron-basic-react-controlled-input
title: React 表单的受控和非受控有什么区别？
aliases: [输入框什么时候用 value，什么时候用 defaultValue？, React 表单状态放在哪里管理？]
category: react
difficulty: 基础
priority: high
projects: []
keywords: [受控组件, 非受控组件, value, defaultValue, onChange]
---

# React 表单的受控和非受控有什么区别？

## 核心回答

受控就是输入框的值由 React state 管，用 value 传进去，再通过 onChange 更新 state。比如输入内容要立刻参与计算、影响另一个字段，用这种方式比较容易跟页面其他状态配合。

非受控则是先让 DOM 自己保存输入，React 可以用 defaultValue 给初始值，提交时再通过 ref 或 FormData 读取。简单表单不需要一边输入一边联动，这样写也挺直接。

需要字段联动的时候，我更偏向受控，值放在 state 里比较好配合；只是填完提交的简单表单，非受控也很直接。我觉得没有必要给所有输入框规定同一种写法。确定用受控文本输入框时，初始值可以给空字符串，避免一会儿 undefined、一会儿又传字符串，在两种方式之间来回切换。
