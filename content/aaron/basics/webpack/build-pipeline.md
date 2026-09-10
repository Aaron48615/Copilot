---
id: aaron-basic-webpack-build-pipeline
title: Webpack 构建流程是什么，编写 Loader 或 Plugin 的思路
aliases: [请讲讲：Webpack 构建流程是什么，编写 Loader 或 Plugin 的思路, 关于“Webpack 构建流程是什么，编写 Loader 或 Plugin 的思路”，你会怎样回答？]
category: webpack
difficulty: 深入
priority: normal
projects: []
keywords: [Webpack, 构建流程, Loader, Plugin]
---

# Webpack 构建流程是什么，编写 Loader 或 Plugin 的思路

## 核心回答

Webpack 启动后先读取并合并配置、命令行参数，初始化 Compiler，注册插件，再从 entry 找到入口。接着处理入口模块，按规则运行 Loader、解析转换后的内容，继续寻找它依赖的其他模块，逐步形成依赖图。

模块处理完成后，Webpack 会根据入口、动态导入和拆分规则组织 Chunk，生成 JavaScript、CSS 等资源，最后按 output 配置输出文件。整个过程中都有钩子，Plugin 可以在对应阶段参与处理。Compiler 可以理解成整体构建管理者，Compilation 更接近某一次具体编译的上下文。

写 Loader 时，我会把它当成源内容到新内容的转换函数，一次只做清晰的一件事，同步处理可以 return 或 this.callback，异步处理可以通过 this.async 拿到回调。写 Plugin 则通常提供 apply(compiler)，在里面注册钩子，比如在资源生成阶段检查或修改产物。

【Loader 的参数可以用 this.getOptions 读取，老代码里也会看到 loader-utils。Plugin 要根据任务选择同步或异步钩子，异步任务要正确结束；Webpack 5 修改资源通常使用 Compilation 的 processAssets 等适当阶段。至于是否真正写过完整插件，要按自己的经历回答，不把了解实现思路说成线上使用经验。】
