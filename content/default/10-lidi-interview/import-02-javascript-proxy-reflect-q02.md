---
id: lidi-202609-import-02-javascript-proxy-reflect-q02
title: Reflect.set 为什么要返回布尔值？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, Reflect, 响应式, 拦截]
---

# Reflect.set 为什么要返回布尔值？

## 核心回答

Proxy 的 `set` 拦截器必须返回是否写入成功。直接 `Reflect.set(target, key, value, receiver)` 会把原生赋值结果传回来；如果在严格模式下返回 false，赋值可能抛错。拦截器里不能写完逻辑却忘记返回结果。
