---
id: lidi-202609-import-02-javascript-request-wrapper-q02
title: 重试会不会把写操作执行多次？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [fetch, AbortController, timeout, retry, 请求封装]
---

# 重试会不会把写操作执行多次？

## 核心回答

会，所以默认只对明确幂等的读取请求重试。写操作要么由服务端提供幂等键，要么只让用户手动重试。比如创建订单，前端不能因为连接超时就盲目再发一次，否则可能生成两笔订单。
