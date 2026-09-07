---
id: lidi-202609-import-04-browser-network-engineering-web-vitals
title: LCP、INP、CLS 分别怎么理解和优化？
aliases: [Core Web Vitals, 页面性能指标, Web Vitals]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LCP, INP, CLS, Web Vitals, 性能]
---

# LCP、INP、CLS 分别怎么理解和优化？

## 核心回答

LCP 看主要内容什么时候完成展示，常见瓶颈是关键图片、字体、服务器响应和渲染阻塞。INP 看用户操作到页面给出下一次绘制的响应，长任务、复杂计算和重复渲染都会拖慢它。CLS 看页面有没有在加载过程中突然挪位置，图片没尺寸、晚加载广告和字体替换都可能造成位移。

我不会看到指标差就先套优化清单。先用真实用户数据和 DevTools 确定是哪一段慢，再改资源、请求、脚本或布局，改完在相近设备和网络下复测。实验室分数和真实用户数据可能不一样，都要看。

