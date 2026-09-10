---
id: aaron-basic-javascript-data-types
title: JS 有哪些数据类型，怎么判断，null 和 undefined 有什么区别
aliases: [请讲讲：JS 有哪些数据类型，怎么判断，null 和 undefined 有什么区别, 关于“JS 有哪些数据类型，怎么判断，null 和 undefined 有什么区别”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: high
projects: []
keywords: [数据类型, typeof, null, undefined]
---

# JS 有哪些数据类型，怎么判断，null 和 undefined 有什么区别

## 核心回答

JavaScript 有七种基本类型：undefined、null、boolean、number、bigint、string、symbol，再加上 object 这一类引用类型，数组和函数都属于对象。

typeof 用起来比较方便，能判断大部分基本类型，函数会返回 'function'；但 null 会得到 'object'，数组也会得到 'object'，所以不能只靠它区分这些值。判断数组我会直接用 Array.isArray，判断自定义类的实例可以用 instanceof，它主要检查构造函数的 prototype 是否在对象的原型链上。Object.prototype.toString.call(value) 能返回类似 '[object Date]' 的标签，适合更细的分类。

undefined 一般表示还没有值，比如变量声明后没赋值、缺少参数或函数没有 return。null 则常用于主动表示“这里没有对象或没有结果”，它也是普通原型链最终的终点。

【instanceof 判断跨 iframe 创建的对象可能不符合直觉，也可以被 Symbol.hasInstance 定制；toString 的类型标签也可能被 Symbol.toStringTag 改变，所以这些方法并不是面对任意对象都绝对可靠。】
