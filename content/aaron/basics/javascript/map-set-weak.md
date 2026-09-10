---
id: aaron-basic-javascript-map-set-weak
title: Map、Set、WeakMap 和 WeakSet 怎么选？
aliases: [Map 和 Set 有什么区别，Weak 版本有什么用？, 保存键值关系和数据去重分别用什么集合？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [Map, Set, WeakMap, WeakSet, 弱引用]
---

# Map、Set、WeakMap 和 WeakSet 怎么选？

## 核心回答

要按编号找到对应数据，我更偏向 Map，键和值的关系比较明确；只是记录某个值出现过没有，或者给基本值去重，用 Set 就挺方便。Map 的键不局限于字符串，也能是对象。

对象去重时要注意，它们看的是不是同一个引用。两个内容一样的新对象放到 Set 里，仍然是两个成员，所以按业务编号去重，得先拿编号来判断。

WeakMap、WeakSet 常见的用途是给对象附加信息，又不想仅仅因为集合还记录着它，就阻止它被回收。它们没有 size，也不能像普通集合那样遍历全部成员。所以需要列出全部数据、统计数量时，还是 Map 或 Set 更合适。确实需要弱引用关系时再考虑 Weak 版本，它也不能自动解决其他引用造成的内存泄漏。
