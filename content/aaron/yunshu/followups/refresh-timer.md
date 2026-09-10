---
id: yunshu-followup-refresh-timer
title: 追问：为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查？
aliases: [能讲讲项目中的提前刷新与一次性定时器的选择吗？, 关于提前刷新与一次性定时器的选择，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, exp, setTimeout, 刷新余量]
---

# 追问：为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查？

## 核心回答

提前 30 秒是给请求耗时和时间偏差留余量。既然知道 exp，就能算出“过期时间减当前时间再减 30 秒”，用一次 setTimeout 触发，拿到新 Token 再计算，不必用 setInterval 一直检查。

临时失败时，只要 Token 还有效，就每 5 秒重试。

【30 秒是当前配置，不是 JWT 规定的最优值，也没有压测依据。后台标签页、电脑休眠或本地时钟偏差可能让定时器晚执行，后面可以在页面恢复可见或请求前再检查。】

## 回答要点

- 提前 30 秒是给请求耗时和时间偏差留余量。
- 临时失败时，只要 Token 还有效，就每 5 秒重试。
- 30 秒是当前配置，不是 JWT 规定的最优值，也没有压测依据。

## 面试官可能追问

- 电脑休眠后定时器晚执行会怎样？
- 为什么 30 秒不能被当作所有系统的最佳刷新余量？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authToken.ts，第 1～2 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:1)：30 秒提前量和 5 秒重试间隔。
> - [authToken.ts，第 40～49 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:40)：根据 exp 计算单次刷新延迟。
> - [SessionManager.tsx，第 68～114 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:68)：setTimeout 调度、失败重试和清理。
