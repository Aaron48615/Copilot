---
id: aaron-basic-browser-url-rendering
title: 从输入 URL 到页面显示，以及浏览器的渲染过程
aliases: [请讲讲：从输入 URL 到页面显示，以及浏览器的渲染过程, 关于“从输入 URL 到页面显示，以及浏览器的渲染过程”，你会怎样回答？]
category: browser
difficulty: 进阶
priority: high
projects: []
keywords: [URL, DNS, DOM, CSSOM, 渲染树]
---

# 从输入 URL 到页面显示，以及浏览器的渲染过程

## 核心回答

> 沿用你的回答。

在浏览器中输入url后，先检查缓存，包括浏览器缓存、系统缓存和路由器缓存，如果命中就直接展示页面

要是没命中，就需要解析DNS，获取服务器IP

拿到IP之后，浏览器与服务器建立TCP连接，进行TCP三次握手

握手成功之后发送HTTP请求，服务器处理请求并返回数据

浏览器收到HTTP响应，读取页面内容，解析HTML代码，生成DOM树，解析CSS，然后渲染页面，执行JS代码

之后是客户端和服务器继续交互，关于数据的地方可能还要有AJAX查询

浏览器的渲染原理

解析网站资源文档HTML，生成DOM树，DOM树由DOM元素和属性节点构成

然后解析CSS，生成CSSOM规则树

再根据DOM树和CSSOM规则树生成渲染树

根据渲染树进行页面布局，确定元素的大小和位置

布局完成后显示在页面上
