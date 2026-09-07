---
id: lidi-202609-import-04-browser-network-engineering-csp-security-q03
title: 怎么定位 CSP 报错？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [CSP, XSS, nonce, script-src, 安全]
---

# 怎么定位 CSP 报错？

## 核心回答

看浏览器 Console 和 Report-Only 上报，确认被拦的是脚本、样式、图片还是连接，再判断该来源是否真的应该允许。修配置前先排除代码里意外注入和错误 URL，不能为了消掉红字直接加通配符。

