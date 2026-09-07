---
id: lidi-202609-import-02-javascript-proxy-reflect-q01
title: 为什么不直接用 Object.defineProperty？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, Reflect, 响应式, 拦截]
---

# 为什么不直接用 Object.defineProperty？

## 核心回答

defineProperty 只能给已有属性加 getter 和 setter，新增属性、删除属性和数组下标需要额外处理。Proxy 代理的是整个对象，可以拦截更多操作，所以 Vue 3 用它做响应式更自然。不过 Proxy 也有兼容性、不可撤销代理和调试复杂度等代价。
