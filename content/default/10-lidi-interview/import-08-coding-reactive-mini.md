---
id: lidi-202609-import-08-coding-reactive-mini
title: 如何手写一个最小响应式系统？
aliases: [手写响应式, reactive 最小实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [响应式, Proxy, effect, computed]
---

# 如何手写一个最小响应式系统？

## 核心回答

最小版本需要三件事：读取时记录当前 effect，写入时找到依赖并重新执行，依赖关系用 `target -> key -> effects` 保存。用 Proxy 可以拦截对象属性访问；effect 执行前要清理旧依赖，避免条件分支变化后还触发过时的 key。computed 还要增加脏标记和缓存，watch 则是在值变化后异步或同步调用回调。

