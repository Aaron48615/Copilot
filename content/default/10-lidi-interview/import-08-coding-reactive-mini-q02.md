---
id: lidi-202609-import-08-coding-reactive-mini-q02
title: 如何验证它真的工作？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [响应式, Proxy, effect, computed]
---

# 如何验证它真的工作？

## 核心回答

先断言读取属性后修改会重新执行，修改未读取的属性不会执行；再测条件分支切换、嵌套对象和停止 effect。用计数器而不是 console.log 做断言，测试会更稳定，也能看出是否重复触发。

