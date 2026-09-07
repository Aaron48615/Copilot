---
id: lidi-202609-import-02-javascript-proxy-reflect-q03
title: Proxy 能监听所有变化吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, Reflect, 响应式, 拦截]
---

# Proxy 能监听所有变化吗？

## 核心回答

不能自动监听内部每一层。访问到嵌套对象时，需要继续给它做代理，或者采用 shallow 版本只代理第一层。Map、Set 也有自己的方法调用语义，处理时不能只照搬普通对象的 get 和 set。
