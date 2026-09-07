---
id: lidi-202609-import-02-javascript-interface-type-q01
title: 声明合并什么时候会带来风险？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, interface, type, declaration merging]
---

# 声明合并什么时候会带来风险？

## 核心回答

同名 interface 可能被不同模块或全局声明悄悄合并，第三方类型增强时很有用，但业务代码里也可能让字段来源不清楚。公共扩展点要有文档和测试，普通领域模型更倾向显式导入和组合，避免依赖隐藏合并。
