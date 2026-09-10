---
id: yunshu-followup-polling-overlap
title: 追问：为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办？
aliases: [能讲讲项目中的五分钟轮询与重叠刷新的处理吗？, 关于五分钟轮询与重叠刷新的处理，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, 轮询, requestId, 定时器]
---

# 追问：为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办？

## 核心回答

首页是概览统计，后端提供普通 HTTP 查询，五分钟轮询接入比较简单，不需要一直维持连接。不过五分钟只是当前配置，不能叫实时监控。

现在手动刷新和定时刷新重叠时，没有请求锁或版本号，旧请求晚返回可能覆盖新数据。我会让一轮结束后再安排下一轮，或者合并重叠刷新，再加 AbortController 或 requestId 控制更新。

【卸载清 interval 不会取消已经发出的请求。轮询间隔要看数据更新频率和允许延迟，真正需要低延迟推送、后端也支持时，再考虑 SSE 或 WebSocket。】

## 回答要点

- 首页是概览统计，后端提供普通 HTTP 查询，五分钟轮询接入比较简单，不需要一直维持连接。
- 现在手动刷新和定时刷新重叠时，没有请求锁或版本号，旧请求晚返回可能覆盖新数据。
- 卸载清 interval 不会取消已经发出的请求。

## 面试官可能追问

- 卸载时清除 interval 能否取消已经发出的请求？
- 怎样根据数据时效要求决定轮询间隔？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 503～530 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:503)：事件请求和手动刷新直接写入状态。
> - [Dashboard.tsx，第 534～554 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:534)：首屏请求、五分钟 interval 和卸载清理。
