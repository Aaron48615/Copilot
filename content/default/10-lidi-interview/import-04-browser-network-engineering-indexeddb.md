---
id: lidi-202609-import-04-browser-network-engineering-indexeddb
title: localStorage、IndexedDB 和 Cache Storage 怎么选？
aliases: [浏览器存储选型, IndexedDB 使用场景]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [localStorage, IndexedDB, Cache Storage, 存储]
---

# localStorage、IndexedDB 和 Cache Storage 怎么选？

## 核心回答

我会先按数据性质来选，而不是先看 API 名字。localStorage 适合少量、同步读取的简单配置，但它会阻塞主线程，也只能存字符串；IndexedDB 适合较大的结构化业务数据和离线队列，读写是异步的；Cache Storage 更像给 Service Worker 用的请求响应缓存，适合离线页面和静态资源。登录态、购物车这类数据还要单独考虑 XSS 和一致性，不能因为“能存”就全部丢到浏览器里。

