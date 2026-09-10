---
id: aaron-basic-javascript-esm-commonjs
title: ESM 和 CommonJS 有什么区别？
aliases: [import 和 require 有什么区别？, JavaScript 两种模块化方式怎么理解？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [ESM, CommonJS, import, require, 模块化]
---

# ESM 和 CommonJS 有什么区别？

## 核心回答

ESM 常见写法是 import、export，CommonJS 是 require、module.exports。前端代码里经常能看到 ESM，Node 的一些旧代码或工具配置里会看到 CommonJS。

ESM 的静态导入关系比较明确，工具更容易提前分析依赖，也方便做 Tree Shaking。require 则可以在代码执行到某个位置时调用，比如放进条件分支，加载过的模块通常还会缓存。

还有一个容易记错的地方：ESM 导入的名字和导出的绑定是连着的，导出方更新变量后，导入方再读能看到变化；CommonJS 拿到的是导出值，但如果这个值是对象，大家仍可能共享同一个对象，不能简单说它一定是深拷贝。所以混用时还得看运行环境和包的配置，光把 import 换成 require，不一定就能运行。
