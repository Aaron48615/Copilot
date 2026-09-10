---
id: aaron-basic-webpack-vite-webpack
title: Vite 和 Webpack 有什么区别？
aliases: [为什么 Vite 开发启动通常比较快？, Vite 开发模式和生产构建有什么不同？]
category: webpack
difficulty: 基础
priority: high
projects: []
keywords: [Vite, Webpack, ESM, 开发服务器, 构建]
---

# Vite 和 Webpack 有什么区别？

## 核心回答

这个要分开发时和生产构建时来看。Webpack 主要围绕模块依赖做编译和打包；Vite 开发时利用浏览器的 ESM 能力，按页面请求提供转换后的模块，所以启动和局部更新通常比较轻。

但不能说 Vite 完全不需要构建，生产环境还是要处理和打包资源，开发时也有依赖处理、代码转换这些工作。Webpack 也有缓存和增量更新，不是每次改一行就从头处理整个项目。

底层工具还要看版本，不能一直背 Vite 必然是 esbuild 加 Rollup；Vite 8 已经使用 Rolldown。选工具时，我更看重框架支持和现有配置能不能配合好。已有项目跑得稳定，我更偏向先保留，真有启动速度或者维护上的问题，再看迁移值不值得。
