---
id: lidi-202609-import-02-javascript-esm-cjs-q01
title: 为什么 ESM 的 import 不能随便写进 if？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [ESM, CommonJS, import, require, tree shaking]
---

# 为什么 ESM 的 import 不能随便写进 if？

## 核心回答

静态 import 要在模块解析阶段确定，不能按运行时条件出现。需要条件加载时用动态 `import()`，它返回 Promise，也正好可以配合路由懒加载和代码分割。
