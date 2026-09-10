---
id: aaron-basic-javascript-page-performance
title: 前端有哪些页面优化方法
aliases: [请讲讲：前端有哪些页面优化方法, 关于“前端有哪些页面优化方法”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [性能优化, 资源加载, DOM]
---

# 前端有哪些页面优化方法

## 核心回答

我会先看慢在哪里，再从网络资源、渲染和 JavaScript 执行三个方向处理。网络上可以压缩图片和 JS、CSS，启用合适的缓存和 gzip 或 Brotli，静态资源用 CDN；路由和大组件按需加载，首屏需要的资源优先，屏幕外图片再懒加载。

页面上尽量减少没有必要的 DOM 和频繁布局操作，把样式修改合并，避免刚写入样式就马上读取尺寸。长列表可以用分页或虚拟列表，动画优先考虑 transform、opacity，必要时用 requestAnimationFrame 协调更新。

JavaScript 上可以给高频输入做防抖、滚动处理做节流，对重复事件使用委托，检查长任务和不再需要的定时器、订阅。最后再用 Network、Performance 或实际指标对比，确认优化的是瓶颈。

【雪碧图、字体图标、SVG、合并资源都属于可选手段。HTTP/2、缓存和按需加载会影响取舍，不是文件合得越大越好，也不是用了闭包、嵌套循环或 calc() 就一定要删掉。】
