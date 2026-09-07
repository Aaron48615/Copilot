---
id: lidi-202609-import-02-javascript-request-wrapper-q01
title: 超时和用户取消怎么区分？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [fetch, AbortController, timeout, retry, 请求封装]
---

# 超时和用户取消怎么区分？

## 核心回答

可以给超时单独定义一个错误类型，用户取消则保留 AbortError，或者给 signal 加 reason。页面收到用户取消时不弹“网络失败”，收到超时才提示重试。错误分类要在请求封装这一层统一做好，组件里就不用猜错误字符串。
