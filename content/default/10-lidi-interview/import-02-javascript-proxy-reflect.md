---
id: lidi-202609-import-02-javascript-proxy-reflect
title: Proxy 和 Reflect 通常怎么一起使用？
aliases: [Proxy 原理, Reflect 的作用, 代理对象]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, Reflect, 响应式, 拦截]
---

# Proxy 和 Reflect 通常怎么一起使用？

## 核心回答

Proxy 是在对象外面包一层，拦截读取、赋值、删除等操作；Reflect 提供一组对应的默认操作。一起用的好处是：我可以在拦截器里做自己的逻辑，真正执行读写时仍然交给 `Reflect.get`、`Reflect.set`，这样 this 绑定和返回值规则更接近 JavaScript 原本的行为。

响应式系统就是典型场景：读取属性时记录当前副作用，修改属性时通知依赖它的副作用。代理本身不等于响应式，依赖收集、触发更新、嵌套对象处理和停止监听还需要另外设计。
