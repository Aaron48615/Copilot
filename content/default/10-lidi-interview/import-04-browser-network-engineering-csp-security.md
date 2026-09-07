---
id: lidi-202609-import-04-browser-network-engineering-csp-security
title: CSP 能防什么，配置时容易踩哪些坑？
aliases: [Content Security Policy, XSS 防护, script-src]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [CSP, XSS, nonce, script-src, 安全]
---

# CSP 能防什么，配置时容易踩哪些坑？

## 核心回答

CSP 是浏览器对脚本、样式、图片、连接来源等资源设置的白名单策略。即使页面出现了某种注入，策略也可能阻止恶意脚本加载或执行，降低 XSS 的影响。它是额外防线，不能替代输出编码、输入处理和安全的模板写法。

上线前我会先用 Report-Only 收集违规报告，再逐步收紧。`unsafe-inline`、通配符和把一堆不明 CDN 全放进白名单都会削弱效果。需要内联脚本时可以用每次请求生成的 nonce 或 hash，不能把固定 nonce 写死在前端代码里。

