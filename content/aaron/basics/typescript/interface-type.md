---
id: aaron-basic-typescript-interface-type
title: interface 和 type 有什么区别，怎么选？
aliases: [描述对象时 interface 和 type 怎么取舍？, TypeScript 接口和类型别名有什么不同？]
category: typescript
difficulty: 基础
priority: high
projects: []
keywords: [interface, type, 联合类型, 声明合并]
---

# interface 和 type 有什么区别，怎么选？

## 核心回答

普通对象的字段和方法，两种都能描述。这种情况下我更喜欢沿用项目已有的写法，同一种数据保持一致，看起来省心一点。

区别比较明显的是，interface 可以通过 extends 扩展，而且同名接口能声明合并。type 的表达范围更广，比如字符串字面量的联合、元组，都可以直接写成类型别名，同名 type 不能这样反复声明。

比如定义一个用户对象，两种都可以；定义状态只能是 loading、success、error，就可以用 type 写联合类型。对象用哪一种有选择空间，联合类型这种场景则直接用 type，区别主要在这里。
