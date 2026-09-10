---
id: yingke-followup-vuex-need
title: 追问：为什么没有使用 Vuex？
aliases: [能讲讲项目中的当前项目不使用 Vuex 的原因吗？, 关于当前项目不使用 Vuex 的原因，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 页面状态, Vuex, 跨页面共享]
---

# 追问：为什么没有使用 Vuex？

## 核心回答

首页、列表和详情的数据基本都只在各自页面里用，跨页面传分类 ID、影片 ID 就够了，没有复杂的用户、收藏或订单状态，所以暂时不用 Vuex。

【以后登录信息、收藏、列表缓存或筛选条件需要多个页面共享，再考虑集中管理。】

## 回答要点

- 首页、列表和详情的数据基本都只在各自页面里用，跨页面传分类 ID、影片 ID 就够了，没有复杂的用户、收藏或订单状态，所以暂时不用 Vuex。
- 以后登录信息、收藏、列表缓存或筛选条件需要多个页面共享，再考虑集中管理。

## 面试官可能追问

- 什么新需求会让全局状态管理变得有价值？
- 页面栈保留列表与全局缓存列表有什么区别？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 22～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:22>)：首页分类数据保存在页面本地。
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：列表和分页状态保存在页面本地。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：依赖中没有 Vuex 或其他状态管理库。
