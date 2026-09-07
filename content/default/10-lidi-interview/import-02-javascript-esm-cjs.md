---
id: lidi-202609-import-02-javascript-esm-cjs
title: ESM 和 CommonJS 有什么区别？
aliases: [import require 区别, 模块化加载, 循环依赖]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [ESM, CommonJS, import, require, tree shaking]
---

# ESM 和 CommonJS 有什么区别？

## 核心回答

ESM 用 `import` 和 `export`，模块关系在语法层面是静态的，构建工具可以提前分析依赖，也更容易做 tree-shaking。CommonJS 用 `require` 和 `module.exports`，可以在运行时按条件加载，Node.js 老项目里比较常见。

两者的导出绑定也不完全一样。ESM 导出的是活绑定，模块里的值变化后，导入方看到的仍然是同一个绑定；CommonJS 更接近把当时的 exports 对象交出去。混用时要注意默认导出、interop 和 package.json 的 type 配置。
