---
id: aaron-basic-react-router-modes
title: HashRouter 和 BrowserRouter 有什么区别
aliases: [请讲讲：HashRouter 和 BrowserRouter 有什么区别, 关于“HashRouter 和 BrowserRouter 有什么区别”，你会怎样回答？]
category: react
difficulty: 基础
priority: normal
projects: []
keywords: [HashRouter, BrowserRouter, HistoryAPI]
---

# HashRouter 和 BrowserRouter 有什么区别

## 核心回答

HashRouter 用 # 后面的内容表示前端路由，这部分不会发送给服务端，所以静态托管时配置比较简单。BrowserRouter 使用浏览器 History API，地址里没有 #，比如 /products/1，访问形式更自然。

区别比较明显的是刷新：BrowserRouter 的深层地址会被直接请求到服务端，服务端要能识别这是前端页面并返回应用入口，否则可能 404。HashRouter 的前端路径不影响请求给服务端的文档地址，但基础路径和资源地址仍然要配置好。

我会根据部署环境来选。需要服务端渲染时，还要配合对应框架或路由器的服务端方案，不能把 BrowserRouter 本身等同于服务端渲染。
