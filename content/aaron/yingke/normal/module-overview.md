---
id: yingke-normal-module-overview
title: 用一句话记住各模块
aliases: [能讲讲项目中的映刻影视各模块的职责吗？, 关于映刻影视各模块的职责，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [首页, 详情页, 请求层]
---

# 用一句话记住各模块

## 核心回答

首页负责展示三个影视分类，列表页负责分页加载，详情页展示某一部影片的信息。`listContent` 是首页共用的卡片组件，`descComment` 处理评论展开和收起，请求层则把 Axios 的调用转成 `uni.request`，统一返回业务数据。

## 回答要点

- 首页负责展示三个影视分类，列表页负责分页加载，详情页展示某一部影片的信息。
- `listContent` 是首页共用的卡片组件，`descComment` 处理评论展开和收起，请求层则把 Axios 的调用转成 `uni.request`，统一返回业务数据。

## 面试官可能追问

- listContent 和 descComment 各负责什么？
- 请求层如何把 Axios 调用连接到 uni.request？

## 代码证据

原文未提供代码依据，待补充
