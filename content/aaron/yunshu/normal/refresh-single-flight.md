---
id: yunshu-normal-refresh-single-flight
title: 亮点一：Token 刷新的并发收敛和迟到响应保护
aliases: [能讲讲项目中的Token 并发刷新和迟到响应保护吗？, 关于Token 并发刷新和迟到响应保护，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [亮点, single flight, authRetry, 会话状态]
---

# 亮点一：Token 刷新的并发收敛和迟到响应保护

## 核心回答

比如首页同时发几个请求，Token 又快失效，如果每个 401 都自己刷新，就会重复请求，新 Token 也可能互相覆盖。

我用 single flight 保存正在刷新的 Promise，后来的调用一起等待，结束后清掉。原请求加 authRetry，最多重新发送一次；刷新回来再对比新旧 Token，用户已经退出或换账号就丢弃结果。

【这个控制只在当前标签页有效，多标签页还没协调，刷新也要求旧 Token 没过期。验证时会同时触发多个 401，再试刷新途中退出，检查是否只刷新一次、旧响应是否会恢复会话。】

## 回答要点

- 比如首页同时发几个请求，Token 又快失效，如果每个 401 都自己刷新，就会重复请求，新 Token 也可能互相覆盖。
- 我用 single flight 保存正在刷新的 Promise，后来的调用一起等待，结束后清掉。
- 这个控制只在当前标签页有效，多标签页还没协调，刷新也要求旧 Token 没过期。

## 面试官可能追问

- 同一批 401 为什么应等待同一个 Promise？
- 多个标签页同时刷新是否受当前控制保护？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authToken.ts，第 51～72 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:51)：只允许未重试请求刷新，以及 single flight 的实现。
> - [authSession.ts，第 63～100 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:63)：刷新前置条件、响应校验和 Token 变化检查。
> - [request.ts，第 35～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:35)：刷新后重放一次原请求并处理刷新失败。
> - [authSession.test.ts，第 55～96 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:55)：代码中已有的并发 Promise、失败释放和重试条件单元测试。
