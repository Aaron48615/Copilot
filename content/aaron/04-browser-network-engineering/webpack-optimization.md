---
id: engineering-webpack-optimization
title: Webpack 层面能做哪些优化？
aliases: [webpack优化, 构建优化, 构建速度, 打包体积]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [tree-shaking, 分包, 压缩, 构建缓存]
---

# Webpack 层面能做哪些优化？

## 核心回答

可以分别看构建速度和产物。构建慢时，先检查 Loader 的处理范围、缓存和 source map 配置；产物大时，检查无用依赖、压缩、tree shaking 和拆包。

路由按需加载能减少首屏所需代码，稳定依赖单独拆分有利于缓存。不过包拆得太碎也会增加请求和管理成本，要结合产物分析判断。

## 追问：内容 hash 怎样帮助缓存？

资源内容变了，文件名中的 hash 也会变，浏览器会请求新地址。内容没变的资源可以继续命中缓存。但实际分包结果也受模块关系和运行时代码影响，不能保证只要依赖版本没变，文件 hash 就一定不变。
