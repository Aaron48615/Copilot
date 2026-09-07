---
id: lidi-202609-import-04-browser-network-engineering-csp-security-q02
title: connect-src 管什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [CSP, XSS, nonce, script-src, 安全]
---

# connect-src 管什么？

## 核心回答

它限制 fetch、XHR、WebSocket、SSE 等连接能访问的来源。配置 API 代理、AI 服务和地图服务时都要加入实际来源，否则页面功能会被浏览器拦掉；来源也不宜直接放宽到 `*`。

