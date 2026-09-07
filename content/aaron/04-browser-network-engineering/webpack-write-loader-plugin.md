---
id: engineering-webpack-write-loader-plugin
title: 写过 Webpack 的 Loader 或 Plugin 吗？
aliases: [编写loader, 编写plugin, loader思路, plugin思路]
category: engineering
difficulty: 亮点
priority: normal
projects: []
keywords: [loader, plugin, 钩子, 扩展]
---

# 写过 Webpack 的 Loader 或 Plugin 吗？

## 核心回答

Loader 负责转换文件内容，比如把一种源码转换成 JavaScript 模块。多个 Loader 可以组合使用，每个只处理自己负责的一步。需要异步处理时，可以通过 Loader 上下文提供的异步回调返回结果。

Plugin 通过 apply 接收 compiler，订阅构建钩子，再使用 compilation 的接口处理资源。比如统计构建产物大小，就适合写成 Plugin。

## 追问：怎么选择应该写 Loader 还是 Plugin？

如果需求是某类文件怎样转换，优先考虑 Loader；如果涉及整个构建过程、多个产物或额外输出，就考虑 Plugin。具体钩子和资源 API 要按 Webpack 版本选择，避免使用已经过时的写法。
