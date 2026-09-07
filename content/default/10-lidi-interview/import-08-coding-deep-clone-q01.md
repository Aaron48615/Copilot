---
id: lidi-202609-import-08-coding-deep-clone-q01
title: 为什么需要 WeakMap？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [深拷贝, 循环引用, structuredClone]
---

# 为什么需要 WeakMap？

## 核心回答

它既能记录原对象到副本的映射，避免循环递归，又不会因为缓存这次拷贝而永久阻止原对象垃圾回收。遇到已经见过的对象直接返回对应副本，还能保留同一引用在副本中的共享关系，而不是复制成两个不同对象。

