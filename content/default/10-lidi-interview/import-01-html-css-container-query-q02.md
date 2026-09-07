---
id: lidi-202609-import-01-html-css-container-query-q02
title: 响应式图片怎么配合？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [container query, media query, 响应式, CSS]
---

# 响应式图片怎么配合？

## 核心回答

`srcset` 和 `sizes` 根据视口与布局选择资源，`picture` 可以按格式或艺术方向切换；如果图片尺寸未知会造成 CLS。容器查询解决布局，不会自动替你选择最合适的图片，图片宽高、懒加载和 object-fit 仍要单独处理。

