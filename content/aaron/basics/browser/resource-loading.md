---
id: aaron-basic-browser-resource-loading
title: defer、async、preload 和 prefetch 怎么选？
aliases: [脚本延迟执行和资源预加载有什么区别？, 怎么安排页面脚本和资源的加载时机？]
category: browser
difficulty: 基础
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# defer、async、preload 和 prefetch 怎么选？

## 核心回答

这几个可以分成两类来看。defer、async 主要影响脚本什么时候执行，preload、prefetch 主要是提前获取资源。

对于外部普通脚本，defer 可以边解析 HTML 边下载，等文档解析完，再按顺序执行。async 是下载好了就尽快执行，多个脚本之间不保证顺序，所以互相依赖的脚本不能随便全加 async。

preload 更适合当前页面马上要用、但浏览器可能发现得比较晚的资源；prefetch 则偏向下一页可能需要的内容。提前下载不等于已经执行脚本。我更偏向只提前加载首屏确实需要的资源，其他的按需要再拿。全部加预加载看着很积极，实际也会争带宽，反而可能让关键内容更晚出来。
