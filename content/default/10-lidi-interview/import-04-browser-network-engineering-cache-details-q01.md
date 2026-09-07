---
id: lidi-202609-import-04-browser-network-engineering-cache-details-q01
title: 为什么带 hash 的 JS 可以长缓存？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Cache-Control, ETag, Last-Modified, CDN, 缓存]
---

# 为什么带 hash 的 JS 可以长缓存？

## 核心回答

内容变了文件名也变，旧文件仍能被旧 HTML 引用，所以静态资源可以 `immutable` 长缓存；HTML 则要短缓存或及时失效，保证用户拿到新入口。发布清理旧 chunk 太快会让停留在旧页面的用户加载失败，部署策略要保留兼容窗口。

