---
id: aaron-basic-html-frontend-performance
title: 前端性能优化
aliases: [请讲讲：前端性能优化, 关于“前端性能优化”，你会怎样回答？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [性能优化, CDN, 懒加载, DOM]
---

# 前端性能优化

## 核心回答

我先从网络和资源说，可以使用雪碧图、懒加载、合并加载、压缩JS和CSS文件，以减少HTTP请求。还可以用CDN，也就是内容分发网络，把常用文件放到离用户更近的节点上，加快资源加载。还要控制cookie的大小，设置合理的过期时间。

再从页面和渲染上看，要减少DOM操作，减少重排重绘，合理使用标签和选择器，避免无意义的复杂结构。
