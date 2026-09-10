---
id: yingke-followup-onshow-onload
title: 追问：【高频】为什么列表初始化放在 `onShow`，不用 `onLoad`？
aliases: [能讲讲项目中的列表初始化的生命周期选择吗？, 关于列表初始化的生命周期选择，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, onShow, onLoad, 重复初始化]
---

# 追问：【高频】为什么列表初始化放在 `onShow`，不用 `onLoad`？

## 核心回答

这里需要调整。onLoad 在页面创建时执行，onShow 每次重新显示都会执行。现在 onLoad 只保存分类 ID，请求放在 onShow，从详情回来又会查，但列表和起始位置没有重置，可能重复追加。

我会把首次请求放到 onLoad，或者加初始化标记，只在确实需要回来刷新时才用 onShow。

## 回答要点

- 这里需要调整。onLoad 在页面创建时执行，onShow 每次重新显示都会执行。
- 我会把首次请求放到 onLoad，或者加初始化标记，只在确实需要回来刷新时才用 onShow。

## 面试官可能追问

- 什么需求下返回页面确实应该重新刷新？
- 加初始化标记后怎样处理用户主动刷新？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 81～87 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onLoad` 保存参数，`onShow` 每次调用初始化。
> - [pages/list/index.vue 第 64～73 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：请求结果直接追加到现有列表。
