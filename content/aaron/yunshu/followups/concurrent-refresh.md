---
id: yunshu-followup-concurrent-refresh
title: 追问：多个请求同时 401 会刷新几次？刷新途中退出会不会又自动登录？
aliases: [能讲讲项目中的并发 401 与刷新途中退出的保护吗？, 关于并发 401 与刷新途中退出的保护，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, single flight, Token 比较, 会话]
---

# 追问：多个请求同时 401 会刷新几次？刷新途中退出会不会又自动登录？

## 核心回答

同一标签页里，刷新还在进行时，后来的 401 会等同一个 Promise，这一批重叠请求只刷新一次，也就是 single flight。结束后清掉 Promise，新一轮仍然可以刷新。

发起刷新时会记下 Token，回来再和 Redux 当前值比较，用户已经退出或换账号就丢弃旧结果，避免又恢复登录。

【这只管当前标签页，多个标签页没有共享锁。特别晚到的旧 401，也可能在上一轮结束后再触发一次刷新。】

## 回答要点

- 同一标签页里，刷新还在进行时，后来的 401 会等同一个 Promise，这一批重叠请求只刷新一次，也就是 single flight。
- 发起刷新时会记下 Token，回来再和 Redux 当前值比较，用户已经退出或换账号就丢弃旧结果，避免又恢复登录。
- 这只管当前标签页，多个标签页没有共享锁。特别晚到的旧 401，也可能在上一轮结束后再触发一次刷新。

## 面试官可能追问

- 特别晚到的旧 401 为什么还可能发起新一轮刷新？
- 多个标签页如何避免各自重复刷新？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authToken.ts，第 60～72 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:60)：缓存并复用进行中的刷新 Promise。
> - [authSession.ts，第 94～107 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:94)：比较刷新前后的 Token，并暴露共享刷新入口。
> - [request.ts，第 43～68 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:43)：多个 401 统一调用刷新服务。
