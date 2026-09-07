---
id: lidi-202609-import-04-browser-network-engineering-csp-security-q01
title: CSP 能防所有 XSS 吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [CSP, XSS, nonce, script-src, 安全]
---

# CSP 能防所有 XSS 吗？

## 核心回答

不能。策略配置错误、可信来源本身被污染、DOM API 使用不当都可能留下风险。用户输入输出时仍要按上下文编码，富文本需要可信的清洗库，密码和 Token 也不能因为有 CSP 就随便放进页面。

