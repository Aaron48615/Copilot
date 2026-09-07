---
id: engineering-http-cache
title: 强缓存和协商缓存的区别？上线后怎么让用户拿到新版本？
aliases: [http缓存, cache-control, etag, 部署缓存更新, 304]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [Cache-Control, ETag, 304, hash, Nginx]
---

# 强缓存和协商缓存的区别？上线后怎么让用户拿到新版本？

## 核心回答

缓存新鲜时，浏览器可以直接复用资源。需要验证时，会带上 If-None-Match 或 If-Modified-Since 询问服务器；内容没变时服务器返回 304，浏览器继续用本地副本。

带内容 hash 的 JS、CSS 适合长缓存，因为内容变了文件名也会变。HTML 可以设置 no-cache，让浏览器使用前先验证；no-cache 不等于不允许保存。

## 追问：上线后用户还看到旧页面，先查哪里？

先查 HTML 和资源的响应头，确认浏览器拿到的是哪个版本。再看 CDN、Service Worker 等是否返回了旧内容。只清掉本机缓存能帮助定位，但最终还是要修正发布和缓存策略。
