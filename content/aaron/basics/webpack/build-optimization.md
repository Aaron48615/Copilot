---
id: aaron-basic-webpack-build-optimization
title: 怎么优化 Webpack 的产物和构建速度
aliases: [请讲讲：怎么优化 Webpack 的产物和构建速度, 关于“怎么优化 Webpack 的产物和构建速度”，你会怎样回答？]
category: webpack
difficulty: 进阶
priority: normal
projects: []
keywords: [Webpack, 构建优化, TreeShaking, 缓存]
---

# 怎么优化 Webpack 的产物和构建速度

## 核心回答

我会把这两个目标分开看：产物优化是让用户加载和运行更快，构建优化是让开发和打包等待更少。产物方面可以开启生产模式和压缩，用 Tree Shaking 去掉能确认没有使用的导出，配合 splitChunks 提取可复用代码，动态 import 按需加载，再用内容哈希和合理缓存减少重复下载。

静态资源也可以压缩图片、抽取 CSS，配合 publicPath 和 CDN。Tree Shaking 依赖可静态分析的模块和副作用信息，不能把 sideEffects 全部随便设成 false，否则样式或初始化逻辑也可能被误删。externals 可以把依赖留给外部提供，但要保证运行环境真的提供了这些依赖。

构建速度方面，先看是哪一步耗时，再缩小 Loader 的 include、exclude 范围，减少不必要的解析和转换，使用缓存，Webpack 5 可以配置文件系统缓存。大型、昂贵且适合并行的任务可以考虑线程处理，但线程启动和通信也有成本，小项目不一定划算。开发环境的 Source Map、压缩和类型检查方式也要按反馈速度来安排。

【旧项目可能用 DllPlugin、DllReferencePlugin 预编译依赖，用 HappyPack 或并行压缩插件提速；现在先评估缓存和现有插件能力，不直接照搬旧配置。Scope Hoisting 是合并模块作用域以减少包装开销，Tree Shaking 是去掉无用代码，它们也不保证构建过程一定更快。】
