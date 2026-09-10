---
id: aaron-basic-browser-http-https
title: HTTP 和 HTTPS 有什么区别
aliases: [请讲讲：HTTP 和 HTTPS 有什么区别, 关于“HTTP 和 HTTPS 有什么区别”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [HTTP, HTTPS, TLS, 证书]
---

# HTTP 和 HTTPS 有什么区别

## 核心回答

HTTP 是应用层的请求响应协议，本身不提供传输加密；HTTPS 是通过 TLS 保护 HTTP 通信，主要提供加密、完整性校验和身份认证。默认端口分别是 80 和 443，但实际也可以配置其他端口。

建立安全连接时，浏览器会校验证书是否可信、是否匹配域名等，再按协商结果建立加密通信。这样传输中的内容不容易被旁观者直接读取或篡改，也能帮助确认连到的服务端身份。

HTTPS 保护的是传输过程，不代表网页没有 XSS、接口没有越权，或者前端代码中的密钥就安全。旧说法常写 SSL，现在讲现代 HTTPS 时一般使用 TLS 这个名称。
