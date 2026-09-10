---
id: yingke-followup-props-validation
title: 追问：为什么 `props` 只使用数组写法？
aliases: [能讲讲项目中的props 数组声明的局限吗？, 关于props 数组声明的局限，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, props, 默认值, 类型检查]
---

# 追问：为什么 `props` 只使用数组写法？

## 核心回答

数组写法比较简单，先声明 main、val 就能接收父组件的数据，但没有类型、必传和默认值检查。main 要逐层读字段，val 当字符串处理，传空值就容易出问题。

我会改成对象写法，补 type、required 和默认值，模板也处理空数据。目前只是把传值接上，这些保护还没加。

## 回答要点

- 数组写法比较简单，先声明 main、val 就能接收父组件的数据，但没有类型、必传和默认值检查。
- 我会改成对象写法，补 type、required 和默认值，模板也处理空数据。

## 面试官可能追问

- 对象或数组默认值为什么需要注意实例隔离？
- 有 props 类型检查是否就可以不做模板空值保护？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/listContent.vue 第 24～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:24>)：`main` 使用数组式 props 声明。
> - [components/descComment.vue 第 9～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:9>)：`val` 使用数组式 props，并直接维护本地字符串状态。
