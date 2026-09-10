---
id: yunshu-normal-request-race-gap
title: 不足四：部分异步请求缺少取消和最新请求保护
aliases: [能讲讲项目中的异步请求取消和最新结果保护的缺口吗？, 关于异步请求取消和最新结果保护的缺口，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, AbortController, requestId, 竞态]
---

# 不足四：部分异步请求缺少取消和最新请求保护

## 核心回答

有些请求没处理好返回顺序，比如首页刷新、事件翻页、仪表盘详情和 AI。用户连续操作时，旧请求可能晚回来覆盖新数据，AI 也可能缺少上一条还在生成的回答。

我会给可替换请求加 AbortController 或递增 requestId，只让最新请求更新状态。AI 再加单会话队列、停止生成和明确的消息状态。

【地图、3D 已有 active 卸载保护，Token 刷新也检查旧 Token，但还不是统一的请求控制。这是代码风险，没有确认已经在线上发生。】

## 回答要点

- 有些请求没处理好返回顺序，比如首页刷新、事件翻页、仪表盘详情和 AI。
- 我会给可替换请求加 AbortController 或递增 requestId，只让最新请求更新状态。
- 地图、3D 已有 active 卸载保护，Token 刷新也检查旧 Token，但还不是统一的请求控制。

## 面试官可能追问

- 旧请求的 finally 为什么也可能影响新页面状态？
- AI 严格一问一答与允许并发需要哪些不同状态？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 503～530 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:503)：事件页码请求和手动刷新未使用取消或请求序号。
> - [Dashboards.tsx，第 149～225 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:149)：详情请求完成后直接写入当前页面状态。
> - [AI.tsx，第 101～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:101)：并发发送读取闭包历史并分别启动流，没有取消控制。
> - [Map.tsx，第 236～293 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:236)：已有 active 标记可作为卸载保护的对照。
