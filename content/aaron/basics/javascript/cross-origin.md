---
id: aaron-basic-javascript-cross-origin
title: 跨域为什么发生，有哪些解决方式
aliases: [请讲讲：跨域为什么发生，有哪些解决方式, 关于“跨域为什么发生，有哪些解决方式”，你会怎样回答？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [跨域, 同源策略, CORS, JSONP]
---

# 跨域为什么发生，有哪些解决方式

## 核心回答

浏览器有同源策略，协议、主机和端口都相同才算同源。前端请求其他源的接口时，浏览器会限制脚本读取响应；有些请求还会先预检，所以不能把跨域简单理解成“请求一定没有发出去”。

接口跨域常用 CORS，由服务端声明允许的源、方法和请求头。带凭证时还需要双方配合，允许源不能随便写成 *。另一种是同源代理：浏览器请求自己的服务端，再由服务端转发到目标接口；开发服务器的代理主要解决开发环境，上线后也要有对应方案。

JSONP 是比较早的办法，先注册回调，再通过 script 请求服务端返回的一段调用回调的 JavaScript。它只适合 GET 类读取，而且会执行对方的代码。跨窗口通信则可以用 postMessage，发送时指定 targetOrigin，接收时校验 origin 和数据格式。

【document.domain 和 window.name 是历史跨域通信技巧，有适用范围和现代浏览器限制，不作为新功能的首选。script、img、iframe 可以在一定条件下嵌入跨源资源，不代表能任意读取这些资源或窗口的内容；给 fetch 设置 no-cors 也不会让响应变得可读。】
