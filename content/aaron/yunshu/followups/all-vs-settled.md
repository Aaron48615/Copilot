---
id: yunshu-followup-all-vs-settled
title: 追问：首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样？
aliases: [能讲讲项目中的首页与地图的 Promise 失败策略吗？, 关于首页与地图的 Promise 失败策略，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, Promise.all, allSettled, 失败隔离]
---

# 追问：首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样？

## 核心回答

首页四组概览一起请求、全部成功后一起更新，所以用 Promise.all；一个拒绝，这一轮就不会提交其他成功数据。地图每个城市可以单独显示，就用 allSettled 保留成功项、统计失败数量。

【两者主要是失败处理方式不同。首页也可以拆卡片状态或改 allSettled，让部分数据可用；不过统一请求层遇到 5xx 还会跳 500 页，这里要和页面的部分失败处理一起调整。】

## 回答要点

- 首页四组概览一起请求、全部成功后一起更新，所以用 Promise.all；一个拒绝，这一轮就不会提交其他成功数据。
- 两者主要是失败处理方式不同。首页也可以拆卡片状态或改 allSettled，让部分数据可用；不过统一请求层遇到 5xx 还会跳 500 页，这里要和页面的部分失败处理一起调整。

## 面试官可能追问

- 统一层遇到 5xx 跳页会怎样影响局部失败展示？
- 首页若要先显示成功卡片需要改变哪些状态？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 486～500 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：首页四组数据使用 Promise.all 整体更新。
> - [Map.tsx，第 252～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:252)：地图环境数据使用 allSettled 保留成功项。
> - [request.ts，第 83～107 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:83)：业务和 HTTP 5xx 的统一跳转处理。
