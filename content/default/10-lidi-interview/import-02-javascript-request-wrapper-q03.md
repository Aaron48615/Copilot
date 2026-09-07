---
id: lidi-202609-import-02-javascript-request-wrapper-q03
title: 为什么不把所有逻辑都塞进 Axios 拦截器？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [fetch, AbortController, timeout, retry, 请求封装]
---

# 为什么不把所有逻辑都塞进 Axios 拦截器？

## 核心回答

拦截器适合做所有请求都需要的事情，比如带 Token、统一解包和处理 401。超时、重试、轮询这些通常跟具体接口有关，全部塞进拦截器以后很难知道一次请求到底会发几次。我会把通用部分放实例，把策略作为明确的函数参数传进去。
