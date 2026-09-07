---
id: lidi-202609-import-04-browser-network-engineering-web-vitals-q01
title: LCP 图片应该怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LCP, INP, CLS, Web Vitals, 性能]
---

# LCP 图片应该怎么处理？

## 核心回答

给图片明确尺寸和合适格式，关键图片不要被 lazy-load 延迟；必要时 preload，但先确认它真的是 LCP 候选。服务器响应慢时，前端单独压图片也不能解决 TTFB。

