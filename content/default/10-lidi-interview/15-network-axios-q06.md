---
id: lidi-202609-network-axios-q06
title: 你的 Axios 怎么封装的？
aliases: [Axios 封装]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [Axios, 封装, axios.create, 拦截器, token, 401]
---

# 你的 Axios 怎么封装的？

面试可以直接这样说：

我项目里一般会对 Axios 做一层统一封装，主要是为了把公共配置和重复逻辑集中处理。

首先我会通过 `axios.create` 创建一个实例，在里面统一配置 `baseURL`、`timeout` 这些公共参数。

然后会加请求拦截器，请求发送之前统一处理一些东西，比如从本地获取 token，然后放到请求头里的 `Authorization`。

响应拦截器主要是统一处理返回结果和异常。比如接口成功时直接返回真正需要的 `data`，如果是 401 就说明登录状态失效，可以清除本地 token，然后跳转登录页；其他错误也可以在这里统一弹提示。

最后我一般会再封装一层 `get`、`post` 之类的请求方法，业务组件里只需要传 URL 和参数，不需要每个地方都重复写 Axios 配置。

所以整体就是：

`axios.create` 创建实例 → 请求拦截器统一加 token → 响应拦截器统一处理数据和错误 → 再封装具体请求方法。

常见追问你再记两个：

* **为什么要封装？**：减少重复代码，统一管理请求配置、token 和异常处理。
* **请求拦截器和响应拦截器区别？**：请求拦截器在请求发出去前处理，响应拦截器在拿到服务器响应后处理。
