---
id: yingke-normal-description-state-gap
title: 不足五：简介组件的状态推导不完整
aliases: [能讲讲项目中的简介组件状态推导的不足吗？, 关于简介组件状态推导的不足，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [不足, computed, props, 展开状态]
---

# 不足五：简介组件的状态推导不完整

## 核心回答

简介有两个问题：没超过 50 个字符的短评论也显示展开，而且只在 created 里处理一次，父组件后面传新内容，页面可能还显示旧文字。

我会把“是否超长”和“是否展开”分开，用 computed 根据 val 和展开状态计算显示文本，或者监听 val 变化。这样长短文本和内容更新都能分别处理。

## 回答要点

- 简介有两个问题：没超过 50 个字符的短评论也显示展开，而且只在 created 里处理一次，父组件后面传新内容，页面可能还显示旧文字。
- 我会把“是否超长”和“是否展开”分开，用 computed 根据 val 和展开状态计算显示文本，或者监听 val 变化。

## 面试官可能追问

- 更换简介时要不要重置展开状态？
- 为什么不宜长期保存两份需要手动同步的文本？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/descComment.vue 第 11～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:11>)：props 和本地展示状态。
> - [components/descComment.vue 第 19～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:19>)：短文本分支仍统一把 `isShow` 设为 true。
> - [components/descComment.vue 第 27～40 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:27>)：展开、收起和仅创建时初始化的逻辑。
