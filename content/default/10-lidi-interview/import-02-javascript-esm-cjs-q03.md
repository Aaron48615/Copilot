---
id: lidi-202609-import-02-javascript-esm-cjs-q03
title: tree-shaking 为什么可能失效？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [ESM, CommonJS, import, require, tree shaking]
---

# tree-shaking 为什么可能失效？

## 核心回答

动态访问导出、模块有副作用、使用 CommonJS 或 package 没有正确声明 sideEffects，都可能让工具保守地保留更多代码。tree-shaking 是构建分析，不是运行时魔法，最终还得看产物分析结果。
