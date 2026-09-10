---
id: yingke-followup-home-performance
title: 追问：首页有哪些性能优化空间？
aliases: [能讲讲项目中的首页的性能优化空间吗？, 关于首页的性能优化空间，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 并行请求, 图片优化, 性能测量]
---

# 追问：首页有哪些性能优化空间？

## 核心回答

现在三个分类已经一起请求，首屏各取 8 条。继续优化前，我会先看请求耗时、图片大小和渲染数量，再决定加图片懒加载、合适尺寸或分类缓存，失败分类也可以单独重试。

【还可以清理没必要的日志，减少很深的对象传递。改完要对比首屏耗时、请求数和流畅度，具体收益需要实测。】

## 回答要点

- 现在三个分类已经一起请求，首屏各取 8 条。
- 还可以清理没必要的日志，减少很深的对象传递。

## 面试官可能追问

- 怎样判断瓶颈在图片、接口还是渲染？
- 分类缓存需要怎样处理过期与失败？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 36～67 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：三个分类并发请求，每项传入 `count: 8`。
> - [components/listContent.vue 第 13～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:13>)：首页卡片直接加载封面并渲染评分。
