---
id: lidi-202609-import-02-javascript-instanceof-prototype-q02
title: 为什么数组跨 iframe 的 instanceof 可能失败？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [instanceof, prototype, 原型链, Object.create]
---

# 为什么数组跨 iframe 的 instanceof 可能失败？

## 核心回答

不同 iframe 有不同的全局对象和 Array 构造函数，数组的原型链指向另一个窗口的 Array.prototype，所以当前窗口的 `instanceof Array` 可能是 false。需要判断内建类型时可以用 `Array.isArray` 或 `Object.prototype.toString`，跨 realm 代码要尽量使用这些不依赖构造函数身份的 API。
