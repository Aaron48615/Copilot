---
id: lidi-202609-import-04-browser-network-engineering-loader-plugin
title: Loader 和 Plugin 的区别？
aliases: [loader, plugin, webpack配置, 常见loader]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [loader, plugin, 编译, 打包]
---

# Loader 和 Plugin 的区别？

## 核心回答

1. Loader 主要转单个模块的内容，Plugin 是挂在构建钩子上，参与整次编译。Sass 不能当普通 JavaScript 跑，先交给 loader 转成 CSS。生成 HTML、统计资源、改最终产物，更适合插件在构建阶段做。

2. 配 loader 用规则匹配文件，并限定处理范围。多个 loader 的普通转换通常从右往左，每一层吃上一层的结果。它不只能返回字符串，也可以带 source map、异步回调、二进制输入，具体要按接口来。

3. Plugin 一般提供 `apply`，拿到 `compiler` 后注册钩子。`compiler` 管整个构建任务，`compilation` 管这一次编译里的模块、依赖和资源。开了监听，文件一改就会再来一次 compilation，上次攒下来的资源状态不能直接拿到下一次用。

4. 看这件事作用在哪一层。Markdown 转成模块，是内容转换，走 loader；输出一份资源清单，是整次产物，走 plugin。有的功能两边都要，比如 loader 转内容、plugin 再改输出。都能改文件，不代表两者干的是同一件事。

5. 转换依赖了额外文件，要告诉构建器，文件一改才能跟着更新、缓存也会失效。插件改资源要挑对时机。验证不只看一次构建成功，改输入后再看增量结果。热更新或缓存命中时，有可能还在用旧内容。

## 追问：Loader 的执行顺序为什么不能只背从右往左？

1. 普通转换阶段常常从右往左，但 loader 还有 pitch 阶段，一般是从左往右走过各个 loader。pitch 如果返回了结果，后面的转换可能就不走了。复杂 loader 出问题，不能只用一条方向规则解释完。

2. 日常拼 Sass、CSS、样式注入，按普通阶段理解输入输出就够用。遇到源码对不上、执行顺序怪，再查有没有定义 pitch、它有没有提前返回。别为了记术语，把真正转了什么内容扔一边。

3. 拿一份很小的输入，记下各阶段收到的内容和调用顺序，同步返回、异步回调别混用。这样能分清是规则没匹配上、pitch 短路了，还是格式对不上。反复换数组顺序，碰巧构建过了，原因还是说不清。

## 追问：写插件时为什么要区分 compiler 和 compilation？

1. `compiler` 是整个构建任务的控制对象，配置和主要生命周期都在这。`compilation` 管某一次编译里的模块、依赖和资源。监听模式下，一个 compiler 会经历多次 compilation，寿命不是同一段。

2. 插件要是在外面的变量里一直累加本次产物，下次编译可能掺进旧数据，清单重复，已经删掉的文件还被记着。每次编译相关的数据放到这一次的作用域里，在合适的钩子处理当次资源。

3. Webpack 5 处理输出，核对 `processAssets` 这类正式接口和阶段，别沿用不匹配的旧示例。测试除了首次构建，还要改模块、删模块、加模块，确认插件结果跟着当前这次编译变。
