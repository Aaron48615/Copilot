---
id: aaron-basic-browser-http-methods
title: HTTP 请求方法有哪些，GET 和 POST 有什么区别
aliases: [请讲讲：HTTP 请求方法有哪些，GET 和 POST 有什么区别, 关于“HTTP 请求方法有哪些，GET 和 POST 有什么区别”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [HTTP请求方法, GET, POST, 幂等]
---

# HTTP 请求方法有哪些，GET 和 POST 有什么区别

## 核心回答

常见的方法有 GET 读取资源，HEAD 只取响应头，POST 提交处理，PUT 创建或整体替换目标资源，PATCH 部分修改，DELETE 删除，OPTIONS 查询允许的通信选项；另外还有 CONNECT 建立隧道、TRACE 做诊断回显。

GET 和 POST 最主要的区别是语义。GET 预期只是读取，不应该用来触发业务状态变更，而且重复请求在语义上是幂等的；POST 通常是提交数据让服务端处理，重复提交可能重复创建订单，所以经常要额外做幂等控制。

使用上，GET 参数一般放在 URL 查询串里，POST 数据通常放请求体。URL 可能进入历史记录和日志，但 POST 也不是天然加密，两者保护传输都要依靠 HTTPS。长度上要看浏览器、服务器和代理限制，不能背成 GET 固定多少字节、POST 完全无限制。

【GET 更常见于缓存，POST 在满足显式缓存条件时也可以被缓存，只是实际支持和使用场景不同。HTTP 所说的“安全方法”表示预期不改变服务端状态，不等于信息不会泄露；POST 也可以同时带 URL 查询参数。】
