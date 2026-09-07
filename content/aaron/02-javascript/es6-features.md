---
id: js-es6-features
title: ES6+ 有哪些常用新特性？
aliases: [es6新特性, es2015, js新语法, 箭头函数区别]
category: javascript
difficulty: 高频
priority: high
projects: []
keywords: [解构, 展开运算符, async await, 可选链, Map]
---

# ES6+ 有哪些常用新特性？

## 核心回答

常用的有 let、const、解构、展开语法、箭头函数、模板字符串和模块化。比如函数参数可以用解构和默认值，更新对象时可以用展开语法保留原字段，再替换需要修改的字段。

异步代码里常用 Promise，以及后来加入的 async/await。Map 和 Set 则适合键值映射和去重。它们不是同一年加入的，通常一起被叫作 ES6+。

## 追问：展开语法算深拷贝吗？

不算。它只复制最外面一层，嵌套对象仍然共享引用。比如复制了订单对象，却直接修改里面的商品数组，原对象也可能受影响。更新嵌套数据时，需要把实际改动的每一层都复制出来。
