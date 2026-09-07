---
id: engineering-vite-webpack
title: Vite 和 Webpack 有什么区别？
aliases: [vite为什么快, vite和webpack, 构建工具对比, 为什么选vite]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [ESM, esbuild, HMR, Rollup, 预打包]
---

# Vite 和 Webpack 有什么区别？

## 核心回答

Webpack 围绕模块依赖图进行打包，Loader 和 Plugin 用来扩展文件处理与构建过程。Vite 的常见开发模式利用原生 ESM 按需处理源码，减少启动前需要完成的工作。

具体比较要看版本：早期 Vite 用 esbuild 处理依赖、Rollup 做生产构建，Vite 8 已改用 Rolldown，不能继续把旧实现当成所有版本的结论。

## 追问：为什么需要预处理依赖？

一些依赖使用 CommonJS，浏览器不能直接按 ESM 使用；另一些依赖拆成很多小模块，会产生大量请求。依赖优化就是把这些问题提前处理。源码按需加载和依赖优化是不同的工作。
