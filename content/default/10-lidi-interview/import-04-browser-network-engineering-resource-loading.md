---
id: lidi-202609-import-04-browser-network-engineering-resource-loading
title: defer、async、preload 和 prefetch 怎么选？
aliases: [脚本加载顺序, 资源优先级, preload prefetch]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# defer、async、preload 和 prefetch 怎么选？

## 核心回答

`defer` 脚本下载时不阻塞 HTML 解析，等文档解析完成后按顺序执行，适合依赖 DOM 或有执行顺序要求的主逻辑。`async` 下载完就执行，可能打断解析，适合互不依赖的统计脚本。普通 script 放在头部时，下载和执行都可能阻塞解析。

`preload` 是告诉浏览器当前页面很快一定会用到某个资源，提前提高优先级；`prefetch` 更像为之后的页面准备，优先级低。预加载写错资源类型或预加载太多，反而会抢走真正关键资源，所以每个 hint 都要有明确理由。

