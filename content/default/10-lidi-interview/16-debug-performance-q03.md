---
id: lidi-202609-debug-performance-q03
title: 如何用浏览器工具定位一个接口慢？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Console, Sources, Network, Performance, Lighthouse, 兼容性, 首屏]
---

# 如何用浏览器工具定位一个接口慢？

## 核心回答

1. 在 Network 中先看请求的总耗时，再展开 Timing，区分排队、DNS、连接、等待服务器和下载响应各花了多少时间。
2. 看请求是否被重复发送，参数是否变化，是否存在旧请求没有取消。
3. 如果等待服务器时间长，可能是后端接口或数据库问题；如果下载时间长，可能是响应体过大；如果请求根本没发出，则要查前端逻辑或跨域。
4. 前端能做的是减少无效请求、合并合理的请求、缓存稳定数据和做好取消；服务端耗时要和后端一起定位。

