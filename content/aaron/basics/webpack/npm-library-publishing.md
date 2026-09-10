---
id: aaron-basic-webpack-npm-library-publishing
title: 发布 npm 包时要注意什么，Webpack 怎么配合
aliases: [请讲讲：发布 npm 包时要注意什么，Webpack 怎么配合, 关于“发布 npm 包时要注意什么，Webpack 怎么配合”，你会怎样回答？]
category: webpack
difficulty: 进阶
priority: normal
projects: []
keywords: [npm, library, peerDependencies, externals]
---

# 发布 npm 包时要注意什么，Webpack 怎么配合

## 核心回答

发布包首先要明确使用者的环境，以及要提供 ESM、CommonJS 还是其他形式的入口。不能默认所有包都必须编译成 ES5，也不能只要本地项目能运行，就认为别人安装后一定能用。package.json 里的入口、exports、types 和需要发布的 files 要对应好。

构建上，Webpack 可以通过 library 等输出配置组织库产物，通过 Babel 按目标环境转译。像 React、Vue 这类希望由使用方提供的依赖，可以结合 peerDependencies 和 externals 避免重复打包；其他依赖是否内置，要根据包的定位决定。

如果是组件库，CSS、字体等必要资源也要一起发布，并考虑样式副作用，避免被使用方错误移除。TypeScript 类型声明、需要的 Source Map、许可证和使用说明也要检查。发布前我会先用 npm pack 检查实际包内容，再在一个最小示例里安装验证，而不是只看源码目录。

【Babel 的 transform-runtime 可以复用辅助函数，减少重复。Source Map 是否发布要考虑调试需求和源码可见范围；旧 extract-text-webpack-plugin 配置在 Webpack 5 通常不会直接照搬。】
