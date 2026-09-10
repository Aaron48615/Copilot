---
id: yingke-followup-component-data
title: 追问：【高频】为什么组件接收的是 `main.value`，而不是直接接收分类数据？
aliases: [能讲讲项目中的组件依赖 main.value 的原因和问题吗？, 关于组件依赖 main.value 的原因和问题，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, props, main.value, 业务数据]
---

# 追问：【高频】为什么组件接收的是 `main.value`，而不是直接接收分类数据？

## 核心回答

父页面把 allSettled 的完整结果传了进来，成功数据放在 value 里，所以组件这么读取。但这样组件就依赖了父页面的请求方式。

我会先在父页面判断结果，只把分类业务数据传给组件。组件只管展示，换地方复用或单独测试都更方便。

## 回答要点

- 父页面把 allSettled 的完整结果传了进来，成功数据放在 value 里，所以组件这么读取。
- 我会先在父页面判断结果，只把分类业务数据传给组件。

## 面试官可能追问

- 把 allSettled 的结果传给组件会限制哪些复用？
- 父页面传值前应该做哪些成功和失败判断？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 42～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:42>)：父页面将 settlement 对象保存到三个分类状态。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：子组件依赖 `main.value` 结构。
