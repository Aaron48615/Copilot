---
id: aaron-basic-webpack-babel-pipeline
title: Babel 的作用、原理和常见配置
aliases: [请讲讲：Babel 的作用、原理和常见配置, 关于“Babel 的作用、原理和常见配置”，你会怎样回答？]
category: webpack
difficulty: 进阶
priority: normal
projects: []
keywords: [Babel, AST, preset-env, polyfill]
---

# Babel 的作用、原理和常见配置

## 核心回答

Babel 是 JavaScript 转译工具，按照目标环境把代码转换成兼容的写法，也能通过插件处理 JSX 等语法。它和 Webpack 的分工不同：Webpack 组织模块依赖和产物，babel-loader 在处理脚本时调用 Babel 做转换。

过程可以分成三步：先把代码解析成 AST，再遍历语法树，由插件修改相关节点，最后从新的 AST 生成代码和需要的 Source Map。@babel/parser 负责解析，@babel/traverse 负责遍历，@babel/generator 负责生成，@babel/core 把这些过程组织起来。

配置里 plugins 是具体转换插件，presets 是一组预设插件，例如 @babel/preset-env 会结合目标环境选择转换。配置可以放在 babel.config、.babelrc 或 package.json 的 babel 字段里，选择时要考虑它作用于整个项目还是局部文件。通常插件先于预设，插件按列表顺序，预设按逆序应用。

语法转换和补齐运行时 API 也要分开。把箭头函数改成普通函数，不代表运行环境就自动有 Promise、Map 等 API；这些要根据目标环境决定是否使用 core-js 等补齐。transform-runtime 主要帮助复用辅助代码，不能不看配置就认为它解决了所有兼容问题。

【@babel/types 用来创建和检查节点，@babel/template 从模板生成节点，@babel/helpers 提供辅助逻辑，@babel/code-frame 显示错误位置，@babel/cli 提供命令行，@babel/register 可以拦截适用的 Node 加载过程。babel-core、babylon、babel-polyfill 等是旧命名或旧方案，不能和现代 @babel/* 配置混用。env 配置按 BABEL_ENV、NODE_ENV 等选环境，具体行为应和所用版本一致。】
