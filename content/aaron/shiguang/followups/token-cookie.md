---
id: shiguang-followup-token-cookie
title: 追问：AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好？
aliases: [能讲讲项目中的登录 Token 与 Cookie 的取舍吗？, 关于登录 Token 与 Cookie 的取舍，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, Token, HttpOnly, CSRF]
---

# 追问：AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好？

## 核心回答

AI Key 是应用共用的，登录 Token 是某个用户访问业务接口用的，用途不同。现在 Token 放 localStorage，主要是方便刷新后恢复登录，Axios 也能直接读取并放进 Authorization，但出现 XSS 时有泄露风险。

后面可以和后端一起改成会话 Cookie，配上 HttpOnly、Secure 和合适的 SameSite，同时处理 CSRF。当前代理不转发浏览器 Cookie，所以认证和代理要一起改。

【HttpOnly 能让脚本读不到 Cookie，但有 XSS 时，恶意脚本仍可能借用户页面发送请求，也不是换成 Cookie 就完全没风险了。】

## 回答要点

- AI Key 是应用共用的，登录 Token 是某个用户访问业务接口用的，用途不同。
- 后面可以和后端一起改成会话 Cookie，配上 HttpOnly、Secure 和合适的 SameSite，同时处理 CSRF。
- HttpOnly 能让脚本读不到 Cookie，但有 XSS 时，恶意脚本仍可能借用户页面发送请求，也不是换成 Cookie 就完全没风险了。

## 面试官可能追问

- 改成 Cookie 会话时代理为什么也要调整？
- HttpOnly 能否阻止恶意脚本借用户身份发送请求？

## 代码证据

> **代码依据（不用于口述）**
> - [Token 存取第 1～10 行](/Users/aaron/personal-hub/apps/project-2/src/utils/auth.ts:1)：localStorage 中 Token 的保存、读取和删除。
> - [request.ts 第 27～36 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)：把 Token 注入 Authorization。
> - [商城代理第 39～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:39)：只转发白名单请求头，不转发 Cookie。
> - 原理参考：[OWASP 浏览器存储安全](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)、[MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)。
