---
id: engineering-webpack-loader-plugin
title: Loader 和 Plugin 的区别？
aliases: [loader, plugin, webpack配置, 常见loader]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [loader, plugin, 编译, 打包]
---

# Loader 和 Plugin 的区别？

## 核心回答

Loader 主要处理单个模块的内容转换，比如 sass-loader 把 Sass 转成 CSS，css-loader 处理 CSS 的依赖。多个 Loader 组合时，普通转换阶段通常从右往左执行。

Plugin 参与更广的构建过程，比如生成 HTML、提取样式或检查产物。它通过构建钩子在合适的时机工作。

## 追问：css-loader 和 style-loader 各自负责什么？

css-loader 处理 CSS 中的依赖并生成模块；style-loader 把样式放到页面中的 style 标签里。生产环境也可以选择提取为独立 CSS 文件，方便并行加载和缓存。
