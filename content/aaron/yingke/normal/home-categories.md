---
id: yingke-normal-home-categories
title: 首页分类聚合
aliases: [能讲讲项目中的首页三个分类的数据聚合吗？, 关于首页三个分类的数据聚合，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [Promise.allSettled, 分类数据, 组件复用]
---

# 首页分类聚合

## 核心回答

首页要同时展示国产剧、综艺和美剧。我在 onLoad 里发三个请求，每个分类先取 8 条，用 `Promise.allSettled` 收集结果，分别存到三个状态里，再传给同一个卡片组件。点“更多”就去对应列表。

三个请求没有先后依赖，可以一起发。不过现在只收集了结果，还没有判断 fulfilled 和 rejected，组件直接读 value，部分请求失败时的处理还没做完整。

【allSettled 会保留每项的结果，但要让成功分类正常展示，还得在页面里分别处理，不能只用了这个方法就说已经完成失败隔离。】

## 回答要点

- 首页要同时展示国产剧、综艺和美剧。我在 onLoad 里发三个请求，每个分类先取 8 条，用 `Promise.allSettled` 收集结果，分别存到三个状态里，再传给同一个卡片组件。
- 三个请求没有先后依赖，可以一起发。不过现在只收集了结果，还没有判断 fulfilled 和 rejected，组件直接读 value，部分请求失败时的处理还没做完整。
- allSettled 会保留每项的结果，但要让成功分类正常展示，还得在页面里分别处理，不能只用了这个方法就说已经完成失败隔离。

## 面试官可能追问

- 失败项没有 value 时组件会怎样？
- 怎样让单个分类失败时仍能显示其他分类？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 22～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:22>)：定义三个分类状态，并在 `onLoad` 中触发加载。
> - [pages/home/index.vue 第 36～67 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：并发执行三个分类请求并保存 settlement 结果。
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：三个首页接口分别固定请求 8 条数据。
> - [pages/home/index.vue 第 3～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：加载态及三个分类组件的渲染入口。
