---
id: aaron-basic-webpack-loader-plugin
title: Loader 和 Plugin 有什么区别，常见的有哪些
aliases: [请讲讲：Loader 和 Plugin 有什么区别，常见的有哪些, 关于“Loader 和 Plugin 有什么区别，常见的有哪些”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: high
projects: []
keywords: [Loader, Plugin, 模块转换]
---

# Loader 和 Plugin 有什么区别，常见的有哪些

## 核心回答

Loader 主要处理模块内容的转换，Plugin 则参与整个构建流程。比如一个文件需要先把 Sass 变成 CSS，再处理 CSS 里的依赖，最后在开发环境注入页面，这就是不同 Loader 组成的处理链；生成 HTML、抽取 CSS、修改最终产物，则更适合 Plugin。

Loader 配在 module.rules，常用 test 匹配文件，use 指定处理方式，普通 Loader 链通常从右到左执行。babel-loader 调用 Babel 转译代码，css-loader 处理 CSS 的 @import、url 和模块依赖，style-loader 把样式注入页面，sass-loader、less-loader 分别编译预处理样式，source-map-loader 读取已有的 Source Map。

Plugin 配在 plugins，一般是插件实例。常见的有 HtmlWebpackPlugin 生成 HTML 并引入资源，MiniCssExtractPlugin 抽取独立 CSS，DefinePlugin 在构建时替换常量；压缩可以用 TerserPlugin、CssMinimizerPlugin 等配合 optimization.minimizer 配置。

【旧配置里 file-loader 负责输出文件，url-loader 可以把小文件转成 data URL；Webpack 5 通常用 Asset Modules，比如 asset/resource、asset/inline、asset。旧 CommonsChunkPlugin 对应的公共拆分通常改用 splitChunks，eslint-loader 可换成检查脚本或 ESLintWebpackPlugin。图片压缩可以用对应优化插件，不能说 css-loader 自己负责所有压缩。DefinePlugin 替换进去的内容会进入产物，不能拿它隐藏密钥。】
