---
id: lidi-202609-import-04-browser-network-engineering-indexeddb-q01
title: 为什么不把 Token 都放 localStorage？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [localStorage, IndexedDB, Cache Storage, 存储]
---

# 为什么不把 Token 都放 localStorage？

## 核心回答

localStorage 容易被同源脚本读取，一旦页面存在 XSS，Token 可能被直接带走。更稳妥的选择通常是短期内存 Token 配合 HttpOnly、Secure、SameSite Cookie，具体还要结合后端认证方案。如果项目只能用 localStorage，我至少会限制权限、缩短有效期、做好输出编码和 CSP，并在退出时清理。

