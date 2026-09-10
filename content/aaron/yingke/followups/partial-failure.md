---
id: yingke-followup-partial-failure
title: 追问：如果三个分类中的一个请求失败，另外两个还能显示吗？
aliases: [能讲讲项目中的单个分类失败时其他分类的展示吗？, 关于单个分类失败时其他分类的展示，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, value, 失败隔离, 组件渲染]
---

# 追问：如果三个分类中的一个请求失败，另外两个还能显示吗？

## 核心回答

成功结果会保留，但不能保证页面正常显示。失败项没有 value，组件却直接读 `main.value.subject_collection`，渲染失败分类时可能报错。

我会先在首页判断 status，成功的传业务数据，失败的显示错误和单独重试入口，才能让其他分类继续展示。

## 回答要点

- 成功结果会保留，但不能保证页面正常显示。失败项没有 value，组件却直接读 `main.value.subject_collection`，渲染失败分类时可能报错。
- 我会先在首页判断 status，成功的传业务数据，失败的显示错误和单独重试入口，才能让其他分类继续展示。

## 面试官可能追问

- 失败项读取 subject_collection 会发生什么？
- 单独重试失败分类需要保留哪些状态？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 42～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:42>)：页面保存完整 settlement 对象，没有判断成功或失败。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：组件直接读取成功结果中的 `main.value`。
