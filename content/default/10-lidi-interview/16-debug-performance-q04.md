---
id: lidi-202609-debug-performance-q04
title: 如何处理浏览器兼容性？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Console, Sources, Network, Performance, Lighthouse, 兼容性, 首屏]
---

# 如何处理浏览器兼容性？

## 核心回答

1. 先确认具体浏览器和版本，以及问题是 JavaScript API、CSS 属性、默认样式还是第三方库造成的。
2. CSS 可以使用 Autoprefixer、降级写法或备用样式；JavaScript 可以通过 Babel 和必要的 polyfill 处理语法或 API 兼容。
3. 对不支持的能力做特性检测，必要时提供基础功能，而不是只判断浏览器名称。
4. 通过目标浏览器测试页面，重点检查布局、表单、滚动、图片、请求和第三方地图等功能，不能只在自己的浏览器里确认。

