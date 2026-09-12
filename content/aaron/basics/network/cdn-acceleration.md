---
id: aaron-basic-network-cdn-acceleration
title: CDN 为什么能加速
aliases: [CDN 是怎样降低资源加载延迟的？, 使用 CDN 为什么不一定就能变快？]
category: network
difficulty: 基础
priority: normal
projects: []
keywords: [CDN, 边缘缓存, 回源, TTFB]
---

# CDN 为什么能加速

## 核心回答

CDN（Content Delivery Network）通过将静态内容或可缓存响应复制到分布式边缘节点，让用户从更近、网络路径更优的节点获取资源。

1. 降低物理距离和往返延迟。
2. 边缘缓存命中时无需回源。
3. 分担源站带宽和请求压力。
4. 可以在边缘完成 TLS、压缩、图片格式转换、HTTP/2/3 等优化。

CDN 不是“放上去就一定快”：缓存键错误、命中率低、回源路径慢、动态内容无法缓存，都可能抵消收益。需监控 hit ratio、边缘 TTFB 和回源 TTFB。
