---
id: yunshu-normal-verify-races
title: 异步请求、401 和乱序
aliases: [能讲讲项目中的异步请求、401 和乱序的验证吗？, 关于异步请求、401 和乱序的验证，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [401, single flight, 请求乱序]
---

# 异步请求、401 和乱序

## 核心回答

我会故意让第一页慢、第二页快，或者连续打开两个仪表盘，检查旧结果会不会覆盖新选择。鉴权同时触发多个 401，看是否只刷新一次、原请求最多重发一次，再试刷新中退出，确认旧响应不会恢复 Token。

【地图会模拟一个城市失败、其他成功，检查显示和失败数量。现有测试只覆盖 Token 工具和 single flight 的部分逻辑，这次没有运行这些场景。】

## 回答要点

- 我会故意让第一页慢、第二页快，或者连续打开两个仪表盘，检查旧结果会不会覆盖新选择。
- 地图会模拟一个城市失败、其他成功，检查显示和失败数量。

## 面试官可能追问

- 怎样构造刷新途中退出的可重复测试？
- 第一页慢于第二页时应检查哪些最终状态？

## 代码证据

> **代码依据（不用于口述）**
>
> - [request.ts，第 35～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:35)：401 刷新和一次重放逻辑。
> - [authSession.ts，第 94～107 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:94)：迟到刷新响应保护和共享刷新入口。
> - [Dashboard.tsx，第 503～517 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:503)：事件页码变化对应的异步请求。
> - [Map.tsx，第 252～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:252)：地图部分失败路径。
> - [authSession.test.ts，第 55～96 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:55)：已有 single flight 和重试条件测试，但本次未执行。
