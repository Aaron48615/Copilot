---
id: lidi-202609-import-02-javascript-type-checking
title: 怎么判断 JS 的数据类型？
aliases: [typeof, instanceof, 类型判断, null和undefined区别]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [typeof, instanceof, Object.prototype.toString, Array.isArray]
---

# 怎么判断 JS 的数据类型？

## 核心回答

判断基本类型通常用 typeof，不过 typeof null 是 object，数组也会得到 object。判断数组我会直接用 Array.isArray。

instanceof 检查的是原型链，适合判断对象是否来自某个构造函数；但跨窗口、跨 iframe 时要小心。Object.prototype.toString.call 能区分很多内置类型，不过也可能受 Symbol.toStringTag 影响，不能把它当成绝对可靠的校验。
