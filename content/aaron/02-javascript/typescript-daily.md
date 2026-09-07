---
id: js-typescript
title: TypeScript 在项目里是怎么用的？
aliases: [ts使用经验, interface和type区别, ts泛型, 为什么用typescript]
category: javascript
difficulty: 高频
priority: high
projects: []
keywords: [interface, type, 泛型, 联合类型, unknown]
---

# TypeScript 在项目里是怎么用的？

## 核心回答

TypeScript 主要帮忙检查数据结构和函数之间的约定。比如给接口响应、组件参数和函数返回值声明类型，改字段时就更容易发现受影响的调用位置。

interface 和 type 都能描述对象。联合类型、类型组合通常用 type；需要扩展接口时可以用 interface。遇到还不确定的数据，先用 unknown，再通过判断缩小类型范围。

## 追问：泛型什么时候有用？

当一段逻辑可以处理多种类型，但输入和输出之间有固定关系时就适合用泛型。比如请求函数的返回结构固定，data 的类型由调用方决定，就可以把这个类型作为参数传进去，不必为每个接口重复写一套函数。
