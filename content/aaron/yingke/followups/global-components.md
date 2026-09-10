---
id: yingke-followup-global-components
title: 追问：为什么全局注册 Vant 组件，不在每个页面单独注册？
aliases: [能讲讲项目中的Vant 全局注册与页面注册的取舍吗？, 关于Vant 全局注册与页面注册的取舍，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 全局注册, 分包, 包体]
---

# 追问：为什么全局注册 Vant 组件，不在每个页面单独注册？

## 核心回答

首页和列表都会用图标、评分、加载提示，全局注册一次就不用各页重复写。现在只有五类常用组件，数量不多，这样比较方便。

【后面组件更多，或者需要分包、控制包体时，再考虑按页面注册，减少不必要的全局依赖。】

## 回答要点

- 首页和列表都会用图标、评分、加载提示，全局注册一次就不用各页重复写。
- 后面组件更多，或者需要分包、控制包体时，再考虑按页面注册，减少不必要的全局依赖。

## 面试官可能追问

- 组件数量增加后怎样判断是否改为页面注册？
- 分包场景下公共组件依赖需要核对什么？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：全局注册 Icon、Rate、Loading、Skeleton 和 Toast。
> - [pages/home/index.vue 第 3～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：首页使用 Loading，并通过子组件使用图标和评分。
> - [pages/list/index.vue 第 3～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:3>)：列表使用 Skeleton、Toast、Rate 和 Icon。
