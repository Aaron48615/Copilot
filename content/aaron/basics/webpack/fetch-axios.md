---
id: aaron-basic-webpack-fetch-axios
title: Fetch 和 Axios 有什么区别
aliases: [请讲讲：Fetch 和 Axios 有什么区别, 关于“Fetch 和 Axios 有什么区别”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: normal
projects: []
keywords: [Fetch, Axios, 请求取消, CORS]
---

# Fetch 和 Axios 有什么区别

## 核心回答

Fetch 是浏览器提供的请求 API，返回 Promise，拿到的是 Response，需要自己检查状态并读取 json、text 或响应流。它收到 404、500 时通常不会直接 reject，所以要看 response.ok；网络错误、被中止等情况才会走拒绝处理。

Axios 是请求库，把常见配置和处理封装得更完整，比如 baseURL、超时、请求响应拦截器、数据转换和进度处理。业务接口比较多时，可以创建统一实例管理鉴权和错误处理；需要直接处理响应流时，Fetch 的接口也很直接。

Fetch 默认携带同源凭证，跨源要按情况设置 credentials: 'include' 并配合 CORS，不是默认永远不带 Cookie。它可以使用 AbortController 的 signal 中止请求，Axios 也支持 signal，所以不能再把“Fetch 不支持取消”作为区别。

【Fetch 可以读取响应流来统计下载进度，但没有完全等同 XHR 的上传进度回调。Axios 的 XSRF 支持只是协助传递相关 token，完整防护仍然需要服务端验证。Axios 不同环境和适配器的能力也可能不同。】
