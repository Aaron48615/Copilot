---
id: yingke-followup-route-ids
title: 追问：为什么通过 URL 参数传分类 ID 和影片 ID？
aliases: [能讲讲项目中的URL 传分类 ID 和影片 ID 的取舍吗？, 关于URL 传分类 ID 和影片 ID 的取舍，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 路由参数, 分类 ID, 影片 ID]
---

# 追问：为什么通过 URL 参数传分类 ID 和影片 ID？

## 核心回答

分类 ID 和影片 ID 比较短，拿到以后就知道查什么。首页传分类 ID，列表选接口；列表传影片 ID，详情自己查数据，不用把整个对象塞进 URL，不同数据也能共用页面。

【目前目标页没校验 ID 是否缺失或合法，后面会在请求前检查，参数有问题就给提示。】

## 回答要点

- 分类 ID 和影片 ID 比较短，拿到以后就知道查什么。
- 目前目标页没校验 ID 是否缺失或合法，后面会在请求前检查，参数有问题就给提示。

## 面试官可能追问

- 目标页收到缺失 ID 时应如何提示？
- 传完整对象会带来哪些同步和编码问题？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/listContent.vue 第 32～35 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:32>)：首页把分类 ID 写入列表页 URL。
> - [pages/list/index.vue 第 75～83 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:75>)：列表把影片 ID 写入详情 URL，并接收分类参数。
> - [pages/detail/index.vue 第 34～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:34>)：详情页读取影片 ID 后请求数据。
