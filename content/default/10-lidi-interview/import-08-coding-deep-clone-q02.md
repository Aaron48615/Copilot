---
id: lidi-202609-import-08-coding-deep-clone-q02
title: 什么时候不该深拷贝？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [深拷贝, 循环引用, structuredClone]
---

# 什么时候不该深拷贝？

## 核心回答

深拷贝会复制整个对象图，成本可能很高，而且常常掩盖了状态边界设计问题。只改一小段状态时，我会做结构共享的浅复制；传输数据时让接口返回不可变快照；需要跨线程传输时再根据结构选择 structured clone 或 Transferable。

