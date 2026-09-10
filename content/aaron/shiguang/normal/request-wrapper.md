---
id: shiguang-normal-request-wrapper
title: 网络请求封装
aliases: [能讲讲项目中的商城的请求封装吗？, 关于商城的请求封装，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [Axios, Authorization, 响应拦截器]
---

# 网络请求封装

## 核心回答

商城里请求比较多，所以我先建了一个 Axios 实例，把基础地址、超时时间和 JSON 请求头放在一起配置。请求之前从本地读 Token，有的话就放进 Authorization；响应回来以后取出业务数据，页面再判断 `success` 或业务状态码。

然后把 GET、POST、PUT、DELETE 也封装了一下。这样 API 文件主要写接口地址和参数，页面调用起来比较直接，后面改地址或者 Token 的携带方式，也不用到处找。

【响应里还会处理旧图片域名，把它换成本站的代理地址。部署版通过 `/api` 转发商城请求，只带必要的请求头，不把浏览器 Cookie 和平台内部头一起传过去。不过业务失败、401 退出和 Token 刷新还没有全部统一处理，这部分不能说已经做完了。】

## 回答要点

- 商城里请求比较多，所以我先建了一个 Axios 实例，把基础地址、超时时间和 JSON 请求头放在一起配置。
- 然后把 GET、POST、PUT、DELETE 也封装了一下。
- 响应里还会处理旧图片域名，把它换成本站的代理地址。

## 面试官可能追问

- HTTP 成功但 success 为 false 时由哪一层处理？
- 代理转发请求头为什么需要白名单？

## 代码证据

> **代码依据（不用于口述）**
> - [request.ts 第 17～25 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:17)：Axios 基础地址、超时和公共请求头。
> - [request.ts 第 27～42 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)：请求前自动读取并注入 Token。
> - [request.ts 第 44～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:44)：响应数据解包和旧图片地址改写。
> - [request.ts 第 58～77 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:58)：GET、POST、PUT、DELETE 二次封装。
> - [商城代理第 19～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:19)：固定上游、路径处理和请求头白名单。
> - [商城代理第 52～80 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:52)：请求转发、15 秒超时和错误返回。
