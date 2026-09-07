---
id: lidi-202609-import-03-frameworks-vue-provide-inject-q02
title: 如何测试依赖注入组件？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [provide, inject, Vue, 依赖注入, Pinia]
---

# 如何测试依赖注入组件？

## 核心回答

测试时在 wrapper 的 global.provide 注入最小实现，分别覆盖默认值、缺失依赖和更新回调。不要为了测试去访问组件内部的注入变量，而是操作页面并断言可见结果。公共 provider 还要测卸载后是否清理订阅和请求。

