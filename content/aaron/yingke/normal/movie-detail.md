---
id: yingke-normal-movie-detail
title: 影视详情查询
aliases: [能讲讲项目中的影片详情查询与展示吗？, 关于影片详情查询与展示，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [影片 ID, onLoad, 空值保护]
---

# 影视详情查询

## 核心回答

进入详情页时只传影片 ID，页面在 onLoad 里拿到 ID，再放进接口路径请求详情，结果存到 movieDetail，用来显示大图封面、标题、副标题和剧情简介。

这样不用把整个影片对象带过去，不同影片也能共用一个详情页。目前浏览流程到详情这里结束。

【movieDetail 一开始是空对象，模板却直接读 `movieDetail.pic.large`，缺少空值判断。请求失败的提示和重试入口也还没加。】

## 回答要点

- 进入详情页时只传影片 ID，页面在 onLoad 里拿到 ID，再放进接口路径请求详情，结果存到 movieDetail，用来显示大图封面、标题、副标题和剧情简介。
- 这样不用把整个影片对象带过去，不同影片也能共用一个详情页。
- movieDetail 一开始是空对象，模板却直接读 `movieDetail.pic.large`，缺少空值判断。

## 面试官可能追问

- movieDetail.pic 尚不存在时模板怎样避免报错？
- 路由里的影片 ID 无效时应怎样反馈？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 75～79 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:75>)：携带影片 ID 跳转详情页。
> - [pages/detail/index.vue 第 18～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:18>)：保存 ID、请求详情并更新 `movieDetail`。
> - [api/detail.js 第 3～8 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:3>)：把影片 ID 拼入详情请求路径。
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：展示封面、标题、副标题和简介。
