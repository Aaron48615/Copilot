---
id: lidi-202609-network-axios-q05
title: Axios 拦截器应该放哪些逻辑？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [HTTP, GET, POST, 401, 404, 500, CORS, OPTIONS, Axios, Network]
---

# Axios 拦截器应该放哪些逻辑？

## 核心回答

1. 请求拦截器适合放公共请求头、Token、请求标识和统一 loading 计数等逻辑。
2. 响应拦截器可以统一判断 HTTP 错误、业务错误和 401，然后把错误转换成页面容易处理的形式。
3. 不建议把所有页面的业务逻辑都塞进拦截器，否则一个接口的特殊规则可能影响全部请求。
4. 上传文件、下载文件和不需要登录的公共接口，也要允许通过配置覆盖默认行为。

