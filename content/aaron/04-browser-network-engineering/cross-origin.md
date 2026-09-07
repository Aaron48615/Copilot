---
id: engineering-cross-origin
title: 什么是跨域？你是怎么解决的？
aliases: [跨域怎么解决, 同源策略, cors, 开发环境代理]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [同源策略, CORS, 预检, Vite proxy, Nginx]
---

# 什么是跨域？你是怎么解决的？

## 核心回答

协议、主机或端口不同，就属于不同的源。浏览器的同源策略会限制脚本读取跨源响应。开发时可以用代理把页面请求转发到后端；生产环境可以用同源反向代理，也可以由服务端正确配置 CORS。

排查时先看请求有没有发出、预检是否成功、响应头是否允许当前来源。接口本身报错和 CORS 失败可能同时出现，要分别确认。

## 追问：带 Cookie 的跨域请求要注意什么？

客户端要按需要开启凭证模式，服务端要允许凭证，并返回明确的允许来源，不能用星号代替。Cookie 还受 SameSite 等属性约束。允许来源应该由服务端校验，不能无条件照抄请求来源。
