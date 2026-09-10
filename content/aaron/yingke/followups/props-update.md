---
id: yingke-followup-props-update
title: 追问：如果父组件传入的简介后来变化，子组件会更新吗？
aliases: [能讲讲项目中的简介 props 更新后的显示同步吗？, 关于简介 props 更新后的显示同步，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, props, created, computed]
---

# 追问：如果父组件传入的简介后来变化，子组件会更新吗？

## 核心回答

props 会更新，但显示用的 wordStr 只在 created 里根据 val 算了一次，后面 val 变了不会自动重新算，所以可能还是旧评论。

我会监听 val，或者直接用 computed，根据当前 val 和展开状态计算文本，就不用手动同步两份数据了。

## 回答要点

- props 会更新，但显示用的 wordStr 只在 created 里根据 val 算了一次，后面 val 变了不会自动重新算，所以可能还是旧评论。
- 我会监听 val，或者直接用 computed，根据当前 val 和展开状态计算文本，就不用手动同步两份数据了。

## 面试官可能追问

- 为什么 props 更新不代表 wordStr 会自动重算？
- 更换内容时展开状态应该如何处理？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/descComment.vue 第 11～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:11>)：组件把 props 内容复制到本地状态。
> - [components/descComment.vue 第 37～40 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:37>)：只在 `created` 时执行格式化。
