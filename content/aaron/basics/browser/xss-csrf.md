---
id: aaron-basic-browser-xss-csrf
title: XSS 和 CSRF 有什么区别，怎么防范
aliases: [请讲讲：XSS 和 CSRF 有什么区别，怎么防范, 关于“XSS 和 CSRF 有什么区别，怎么防范”，你会怎样回答？]
category: browser
difficulty: 进阶
priority: high
projects: []
keywords: [XSS, CSRF, SameSite, CSP]
---

# XSS 和 CSRF 有什么区别，怎么防范

## 核心回答

XSS 是不可信内容被当成脚本在目标页面执行，比如把用户输入直接拼进 HTML，攻击代码就可能在其他用户浏览页面时运行。它主要利用的是页面信任了恶意内容，可能读取页面数据、冒充用户操作，不是简单地“攻击服务器”。

CSRF 是利用浏览器可能自动携带登录 Cookie 等凭证，从其他站点诱导用户向目标站点发出非本意的请求。它不一定要在目标页面注入脚本，也不一定能读取响应，能让服务端执行有副作用的操作就可能造成影响。

防 XSS 主要是按输出位置正确转义，避免把不可信文本交给 innerHTML、v-html 等接口；必须支持富文本时用可靠的清洗方案，CSP 可以做额外防护。防 CSRF 则结合 SameSite Cookie、服务端验证 CSRF Token、检查 Origin 等方式，状态变更也不应该用 GET 来做。

【HttpOnly 可以阻止脚本直接读取 Cookie，但不能阻止已经执行的恶意脚本以用户身份发请求，所以不是完整的 XSS 防护。前后端都要配合，不能只靠“用了 Axios”或“开启 HTTPS”就认为这两类风险已经解决。】
