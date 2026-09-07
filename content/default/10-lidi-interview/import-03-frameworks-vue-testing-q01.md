---
id: lidi-202609-import-03-frameworks-vue-testing-q01
title: Vue 2 的 nextTick 怎么在测试里用？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Vue Test Utils, E2E, 异步, 交互]
---

# Vue 2 的 nextTick 怎么在测试里用？

## 核心回答

触发输入或修改响应式数据后，DOM 更新是异步批处理的，测试要等待 `nextTick` 或工具提供的异步 flush，再断言页面。它只等待 Vue 自己的更新，不会自动等待网络请求、定时器或动画；这些要分别控制。固定 sleep 会让测试慢且容易抖动。

