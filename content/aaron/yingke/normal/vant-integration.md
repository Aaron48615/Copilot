---
id: yingke-normal-vant-integration
title: Vant Weapp 组件接入
aliases: [能讲讲项目中的Vant Weapp 组件的接入吗？, 关于Vant Weapp 组件的接入，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [Vant Weapp, 全局注册, 加载组件]
---

# Vant Weapp 组件接入

## 核心回答

我把 Vant 的图标、评分、Loading、Skeleton 和 Toast 注册成全局小程序组件，首页和列表就不用重复注册了。它们主要负责评分、图标和加载提示，数据整理、跳转和分页还是自己在页面里处理。

【这里做的是现成组件的接入和使用，Vant 内部实现不是我写的。】

## 回答要点

- 我把 Vant 的图标、评分、Loading、Skeleton 和 Toast 注册成全局小程序组件，首页和列表就不用重复注册了。
- 这里做的是现成组件的接入和使用，Vant 内部实现不是我写的。

## 面试官可能追问

- 第三方组件能力与自己实现的业务怎样区分？
- 组件变多后是否仍适合全部全局注册？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：全局注册五类 Vant Weapp 组件。
> - [components/listContent.vue 第 5～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:5>)：首页卡片使用图标和评分组件。
> - [pages/list/index.vue 第 3～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:3>)：列表页使用骨架屏、Toast、评分和图标组件。
