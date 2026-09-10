---
id: yingke-normal-movie-card
title: 首页影视卡片组件
aliases: [能讲讲项目中的首页影视卡片的复用吗？, 关于首页影视卡片的复用，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [listContent, props, scroll-view]
---

# 首页影视卡片组件

## 核心回答

首页三个分类的布局一样，所以我把标题、总数、横向卡片、评分和“更多”跳转封装成 listContent。首页传不同分类的数据，组件就展示对应内容，以后改卡片布局只需要改一个地方。

卡片用横向 scroll-view，标题超出一行省略，星级用 Vant 的只读评分组件，点“更多”会把分类 ID 传给列表页。

【现在组件直接读取 main.value，连父页面使用 allSettled 的结果结构也依赖了。后面应该先取出业务数据再传入，props 的类型和默认值也需要补。】

## 回答要点

- 首页三个分类的布局一样，所以我把标题、总数、横向卡片、评分和“更多”跳转封装成 listContent。
- 卡片用横向 scroll-view，标题超出一行省略，星级用 Vant 的只读评分组件，点“更多”会把分类 ID 传给列表页。
- 现在组件直接读取 main.value，连父页面使用 allSettled 的结果结构也依赖了。

## 面试官可能追问

- 组件直接依赖 allSettled 结果会带来什么耦合？
- 分类数据为空时组件需要哪些默认值？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 7～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:7>)：同一个组件分别接收三个分类结果。
> - [components/listContent.vue 第 1～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:1>)：分类标题、总数、横向卡片、封面和评分结构。
> - [components/listContent.vue 第 24～43 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:24>)：接收 `main` 并携带分类 ID 跳转列表页。
> - [components/listContent.vue 第 67～99 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:67>)：横向布局、卡片尺寸和标题单行省略样式。
