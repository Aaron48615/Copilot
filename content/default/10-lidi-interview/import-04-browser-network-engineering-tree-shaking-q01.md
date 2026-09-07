---
id: lidi-202609-import-04-browser-network-engineering-tree-shaking-q01
title: sideEffects 写错会怎样？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tree-shaking, ESM, sideEffects, 循环依赖]
---

# sideEffects 写错会怎样？

## 核心回答

把有副作用的 CSS 导入、polyfill 或注册代码误标成无副作用，可能被整个删掉，页面看起来像“样式偶尔丢了”。反过来把所有文件都标成有副作用，则体积变大。应该按包的真实入口和文件类型配置，并用构建产物和运行时 smoke 验证。

