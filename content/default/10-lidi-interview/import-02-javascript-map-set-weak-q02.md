---
id: lidi-202609-import-02-javascript-map-set-weak-q02
title: 用对象去重有什么坑？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Map, Set, WeakMap, WeakSet, 垃圾回收]
---

# 用对象去重有什么坑？

## 核心回答

对象键会被转成字符串，`[object Object]` 等键容易冲突，也无法直接区分对象身份。Set 对原始值按 SameValueZero 判断，对象按引用身份判断；如果要按某个字段去重，先明确字段缺失、大小写和排序规则，再用 Map 保存代表项。
