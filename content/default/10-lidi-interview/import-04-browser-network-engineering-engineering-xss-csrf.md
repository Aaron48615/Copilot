---
id: lidi-202609-import-04-browser-network-engineering-engineering-xss-csrf
title: XSS 和 CSRF 的区别？怎么防？
aliases: [xss, csrf, 跨站脚本攻击, 跨站请求伪造]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [XSS, CSRF, 转义, SameSite, CSRF Token]
---

# XSS 和 CSRF 的区别？怎么防？

## 核心回答

1. XSS 是不可信内容变成脚本在目标站点上下文执行，例如把评论直接拼成 HTML。CSRF 是攻击者诱导浏览器带着现有身份向目标站点发请求，通常利用自动携带的 Cookie；它不要求先在目标页面注入脚本。

2. 防 XSS 我首先避免使用不可信数据拼接可执行内容。普通文本依靠框架转义或 textContent，富文本经过专门清洗，URL 要检查协议；存储型、反射型和 DOM 型只是常见分类，不能只过滤 script 标签就认为所有位置都安全。

3. CSP 可以限制脚本执行，HttpOnly 可以限制脚本读取 Cookie，但即使 Cookie 读不到，恶意脚本仍可能以当前用户身份发请求。因此还要控制高风险 DOM 用法、第三方脚本和服务端权限，不能把某一个属性当作完整保护。

4. 防 CSRF 时，服务端可以校验与会话关联的 CSRF Token，并结合 Origin 等来源信息。Cookie 的 SameSite 也能减少跨站携带，但 site 与 origin 不同，Lax 还有导航等边界；修改状态的操作不应该用随意可触发的 GET。

5. Token 手动放 Authorization 能减少依赖 Cookie 的传统 CSRF 条件，但如果保存在可读存储中仍面临 XSS。实际方案要按凭据如何发送来判断，JWT 只是令牌形式，不自带免疫这两类攻击的能力，还要验证真实接口是否执行了这些检查。

## 追问：SameSite=Lax 为什么不能代替所有 CSRF 校验？

1. Lax 通常限制跨站子请求携带 Cookie，但允许某些顶层安全方法导航。如果服务端错误地通过 GET 修改状态，攻击者诱导用户打开链接仍可能触发操作，所以首先要让接口语义和方法设计正确。

2. SameSite 判断的是站点关系，不完全等于协议、域名和端口构成的同源关系。来自相关子域的请求可能仍属于同站点，如果其中一个子域不可信，就不能只靠 SameSite 判断请求一定安全。

3. 我会把 Cookie 属性与 CSRF Token、来源校验结合，并测试登录回调等真实跨站流程。限制过严也可能破坏正常业务，所以要明确哪些请求确实需要跨站，不能简单在所有环境复制同一设置。

## 追问：有 XSS 时，CSRF Token 还能保证操作安全吗？

1. 同源恶意脚本通常能读取页面里的 CSRF Token，或者调用页面已有请求逻辑，因此可能通过原本用于阻止站外伪造请求的校验。这不是 CSRF Token 没作用，而是攻击者已经进入了它默认信任的页面环境。

2. HttpOnly 可以保护会话 Cookie 不被直接读出，但浏览器仍会在符合条件的请求里自动携带它。攻击脚本不必知道 Cookie 内容，也能代替用户操作，所以只修 Cookie 属性不能解决脚本注入。

3. 我会优先修复不可信内容进入执行上下文的问题，并对敏感操作采用适当的再次确认或认证。事后还需评估会话和数据影响，不能因为 CSRF 校验日志显示通过，就断定请求一定由用户主动发起。
