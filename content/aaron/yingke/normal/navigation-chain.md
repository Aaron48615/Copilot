---
id: yingke-normal-navigation-chain
title: 首页到列表再到详情的导航链路
aliases: [能讲讲项目中的首页、列表和详情的导航链路吗？, 关于首页、列表和详情的导航链路，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [分类 ID, 影片 ID, 路由参数]
---

# 首页到列表再到详情的导航链路

## 核心回答

页面之间主要传两种 ID。首页点“更多”传分类 ID，列表根据它选择接口；点击影片再传影片 ID，详情页根据 ID 请求具体信息。同一个列表页和详情页就能展示不同的数据。

【现在还没检查参数缺失或错误的情况，后面需要在请求前加校验。】

## 回答要点

- 页面之间主要传两种 ID。首页点“更多”传分类 ID，列表根据它选择接口；点击影片再传影片 ID，详情页根据 ID 请求具体信息。
- 现在还没检查参数缺失或错误的情况，后面需要在请求前加校验。

## 面试官可能追问

- 为什么不把整个影片对象放进 URL？
- 参数缺失时应继续请求还是先拦截？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/listContent.vue 第 28～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:28>)：从首页向列表页传分类 ID。
> - [pages/list/index.vue 第 53～62 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:53>)：根据分类 ID 选择接口。
> - [pages/list/index.vue 第 75～83 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:75>)：向详情页传影片 ID，并接收列表页分类参数。
> - [pages/detail/index.vue 第 25～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:25>)：根据影片 ID 请求详情。
