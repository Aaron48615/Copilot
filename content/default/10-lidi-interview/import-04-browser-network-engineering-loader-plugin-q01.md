---
id: lidi-202609-import-04-browser-network-engineering-loader-plugin-q01
title: css-loader 和 style-loader 各自负责什么？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [loader, plugin, 编译, 打包]
---

# css-loader 和 style-loader 各自负责什么？

## 核心回答

css-loader 处理 CSS 中的依赖并生成模块；style-loader 把样式放到页面中的 style 标签里。生产环境也可以选择提取为独立 CSS 文件，方便并行加载和缓存。

