---
id: lidi-202609-import-02-javascript-map-set-weak-q01
title: WeakMap 为什么不能遍历？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Map, Set, WeakMap, WeakSet, 垃圾回收]
---

# WeakMap 为什么不能遍历？

## 核心回答

如果能枚举，就可能通过观察键是否仍存在推断垃圾回收时机，破坏实现的不可观察性。WeakMap 只提供按已知对象查询、写入和删除的能力。需要展示所有缓存条目或按时间淘汰时，应使用 Map 加明确清理策略。
