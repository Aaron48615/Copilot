---
id: engineering-npm-package
title: 发布一个 npm 包，构建上要注意什么？
aliases: [npm发包, 发布npm包, peerDependencies, 组件库构建]
category: engineering
difficulty: 亮点
priority: normal
projects: []
keywords: [npm, peerDependencies, externals, tree-shaking]
---

# 发布一个 npm 包，构建上要注意什么？

## 核心回答

先明确包给谁用，再决定输出格式和入口。只支持 ESM，还是同时兼容 CommonJS，要跟目标环境一致。package.json 里的 exports、类型声明和实际发布文件也要对应。

React 这类需要和宿主共享的依赖，通常通过 peerDependencies 声明，并在构建时排除。普通依赖是否打进去，要看包的设计，不是所有依赖都必须采用同一种处理方式。

## 追问：sideEffects 可以直接写 false 吗？

只有确实没有导入副作用时才适合。比如样式文件或注册逻辑需要执行，就要保留对应文件的副作用声明，否则打包工具可能把它们删掉。发布前可以用 npm pack 检查包里实际包含什么，再在小项目中安装验证。
