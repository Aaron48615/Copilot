---
id: aaron-basic-engineering-eslint-disable
title: `eslint-disable` 能不能用
aliases: [什么时候可以局部关闭 ESLint 规则？, 怎样控制 eslint-disable 的影响范围？]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [ESLint, 规则禁用, 局部范围]
---

# `eslint-disable` 能不能用

## 核心回答

能用，但要尽量缩小范围并说明原因。优先禁用一行的某条规则，不要直接关闭整个文件的所有规则。

```js
// 第三方 SDK 要求该全局回调名称
// eslint-disable-next-line no-unused-vars
function legacySdkCallback(payload) {}
```
