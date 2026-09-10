---
id: yunshu-normal-token-refresh
title: Token 无感刷新
aliases: [能讲讲项目中的Token 无感刷新流程吗？, 关于Token 无感刷新流程，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [single flight, 401, Token]
---

# Token 无感刷新

## 核心回答

我会读 Token 的 exp，在过期前 30 秒安排刷新。如果业务请求先返回 401，也会尝试刷新，成功后再发一次原请求。

多个请求同时要刷新时，共享同一个 Promise，后来的请求等这一次结果，不重复调用刷新接口。结果回来后再对比 Redux 当前 Token，避免用户已经退出或换账号，旧结果又把登录状态写回来。

【这种共享正在执行的 Promise 的方式叫 single flight。当前需要用尚未过期的 Token 续期，Token 真过期、刷新返回 401 或响应不完整时，就要求重新登录，不会无限重试。】

## 回答要点

- 我会读 Token 的 exp，在过期前 30 秒安排刷新。
- 多个请求同时要刷新时，共享同一个 Promise，后来的请求等这一次结果，不重复调用刷新接口。
- 这种共享正在执行的 Promise 的方式叫 single flight。

## 面试官可能追问

- 刷新期间用户退出，迟到结果应该怎样处理？
- 错过续期时间且 Token 已过期还能恢复吗？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authToken.ts，第 1～58 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:1)：30 秒提前量、5 秒重试间隔、JWT 过期时间解析和重试条件。
> - [authToken.ts，第 60～72 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:60)：single flight 共享进行中的刷新 Promise。
> - [authSession.ts，第 63～107 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:63)：独立刷新客户端、响应校验、迟到响应保护和单例刷新入口。
> - [request.ts，第 17～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:17)：每次请求读取最新 Token，刷新后只重放原请求一次。
> - [request.ts，第 73～110 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：同时处理 HTTP 401 和 HTTP 200 内的业务 401。
> - [SessionManager.tsx，第 27～114 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:27)：过期弹窗、定时刷新、临时失败重试和定时器清理。
