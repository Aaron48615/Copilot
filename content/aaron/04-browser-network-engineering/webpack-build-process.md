---
id: engineering-webpack-build-process
title: Webpack 的构建流程是怎样的？
aliases: [webpack流程, 构建流程, 打包原理]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [入口, 依赖图, chunk, 编译]
---

# Webpack 的构建流程是怎样的？

## 核心回答

可以按三个阶段理解。先读取配置、创建编译器并注册插件；再从入口出发，处理模块及其依赖；最后组织 chunk，完成优化并输出文件。

处理模块时，Loader 负责把对应文件转换成构建能够继续处理的内容。Plugin 可以接入构建过程中的钩子，比如生成额外文件或检查产物。

## 追问：chunk 和输出文件是什么关系？

chunk 是打包过程里组织模块的一种单位，入口和动态导入都可能影响它的划分。输出时一个 chunk 可能关联 JavaScript、样式等资源，所以不能简单认为每个 chunk 永远只对应一个文件。
