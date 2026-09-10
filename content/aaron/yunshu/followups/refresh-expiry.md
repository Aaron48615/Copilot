---
id: yunshu-followup-refresh-expiry
title: 追问：Token 真的过期了还能刷新吗？你有 refreshToken 吗？
aliases: [能讲讲项目中的Token 过期续期与 refreshToken 的区别吗？, 关于Token 过期续期与 refreshToken 的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, Token 续期, refreshToken, 401]
---

# 追问：Token 真的过期了还能刷新吗？你有 refreshToken 吗？

## 核心回答

现在没有独立的 refreshToken，用的是还没过期的 Token 调刷新接口，更像提前续期。调用前会检查 exp，已经过期就要求重新登录，所以错过续期时间就不能继续无感恢复。

收到 401 时，如果本地 Token 还没过期，也会尝试续期一次。

【401 也可能是后端提前让 Token 失效。要改成 accessToken 加 refreshToken，需要后端支持刷新凭据的有效期、轮换、撤销和存储，不是前端多存一个字段就行。】

## 回答要点

- 现在没有独立的 refreshToken，用的是还没过期的 Token 调刷新接口，更像提前续期。
- 收到 401 时，如果本地 Token 还没过期，也会尝试续期一次。
- 401 也可能是后端提前让 Token 失效。

## 面试官可能追问

- 本地 Token 未过期却收到 401 时还能保证续期成功吗？
- 引入独立刷新凭据需要后端补哪些约定？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authSession.ts，第 63～76 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:63)：使用当前 Token 刷新，并拒绝已过期 Token。
> - [authToken.ts，第 51～58 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:51)：只有存在、未过期且未重试的 Token 才允许续期。
> - [SessionManager.tsx，第 101～107 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:101)：已过期或无法解析时通知会话失效。
