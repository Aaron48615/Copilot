---
id: lidi-202609-import-02-javascript-map-set-weak
title: Map、Set、WeakMap 和 WeakSet 怎么选？
aliases: [Map Set WeakMap, 弱引用集合, 集合类型选型]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Map, Set, WeakMap, WeakSet, 垃圾回收]
---

# Map、Set、WeakMap 和 WeakSet 怎么选？

## 核心回答

需要任意类型键和值、明确遍历顺序时用 Map；只需要去重或判断存在性时用 Set。WeakMap 和 WeakSet 只接受对象键或值，不可枚举，适合给对象附加元数据且不希望集合本身阻止垃圾回收，比如缓存 DOM 节点的信息。它们不是“自动释放所有缓存”的万能方案，仍要控制引用关系和业务生命周期。
