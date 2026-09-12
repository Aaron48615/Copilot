---
id: aaron-basic-network-session-token
title: Session Cookie 与 Token 怎么选择，浏览器凭证应该放在哪里？
aliases: [浏览器登录态用 Session 还是 Token？, 登录凭证的存储和安全边界怎么考虑？]
category: network
difficulty: 进阶
priority: high
projects: []
keywords: [Session, Token, HttpOnly, JWT, CSRF]
---

# Session Cookie 与 Token 怎么选择，浏览器凭证应该放在哪里？

## 核心回答

### Session Cookie 与 Token

| 方案 | 服务端状态 | 浏览器如何携带 | 优点 | 需要注意 |
| --- | --- | --- | --- | --- |
| Session Cookie | 服务端保存会话或会话索引 | 浏览器按 Cookie 规则自动携带 | 易于服务端撤销，适合传统 Web/BFF | CSRF、防会话固定、共享会话存储 |
| Access Token | 服务端可只验证令牌，也可结合状态 | 通常放请求头 | 适合 API、移动端和多服务 | 泄漏、过期、刷新与撤销机制 |

JWT 只是 Token 的一种表示格式。它通常是**签名**而不是加密，所以载荷可以被读取；它也不会自动解决 XSS、吊销、权限更新和密钥轮换问题。不要把“用了 JWT”等同于“系统安全且无状态”。

### 浏览器中 Token 放在哪里

面向浏览器的同站应用，通常优先考虑 BFF 或服务端 Session，把会话标识放在：

```http
Set-Cookie: session=opaque-value; HttpOnly; Secure; SameSite=Lax; Path=/
```

- `HttpOnly`：JavaScript 不能读取 Cookie，降低 XSS 直接窃取会话值的风险。
- `Secure`：只通过 HTTPS 发送。
- `SameSite`：限制跨站携带，帮助防御 CSRF；具体取值取决于业务跳转和嵌入需求。
- Cookie 应设置最小化的 `Domain`、`Path` 和合理有效期。

不建议把 Session ID、长期 Access Token 或 Refresh Token 放在 `localStorage`/`sessionStorage`：页面中的 JavaScript 能读取它们，一旦发生 XSS，令牌很容易被窃取。`HttpOnly` 不能阻止攻击脚本借用户身份发请求，所以仍需内容安全策略、输出转义和输入处理来防 XSS。

### Cookie 为什么还要防 CSRF

浏览器会按 Cookie 规则自动携带凭证，攻击站点可能诱导用户向目标站点发送请求。常见防御包括：

- 合理设置 `SameSite`；
- 对修改状态的请求验证 CSRF Token；
- 校验 `Origin`/`Referer`；
- GET 只做安全读取，不用 GET 执行删除、转账等操作；
- 敏感操作进行二次确认或重新认证。
