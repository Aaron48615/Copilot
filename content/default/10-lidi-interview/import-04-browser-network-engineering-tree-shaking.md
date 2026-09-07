---
id: lidi-202609-import-04-browser-network-engineering-tree-shaking
title: tree-shaking 为什么有时失效？
aliases: [tree shaking, sideEffects, 动态导入]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tree-shaking, ESM, sideEffects, 循环依赖]
---

# tree-shaking 为什么有时失效？

## 核心回答

tree-shaking 依赖构建器能静态分析 ESM 的 import/export，并确认未使用代码没有副作用。CommonJS、动态拼接模块路径、顶层注册或错误的 `sideEffects` 配置都会让构建器不敢删除；循环依赖也可能改变初始化顺序。排查时看构建分析报告和实际产物，不要只看“用了 ESM”就断言体积一定变小。

