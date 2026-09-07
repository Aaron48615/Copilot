---
id: lidi-202609-import-04-browser-network-engineering-resource-loading-q02
title: preload 为什么可能造成警告？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# preload 为什么可能造成警告？

## 核心回答

浏览器发现预加载资源在规定时间内没被使用，说明优先级提示可能写错了。字体、图片、模块脚本还要配置正确的 as、跨域和 MIME，否则可能重复下载或根本没命中。

