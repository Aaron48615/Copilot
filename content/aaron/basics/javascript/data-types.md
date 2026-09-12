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

### JavaScript 有哪些数据类型

JavaScript 语言类型可以分为原始类型和对象类型：

- 7 种原始类型：`undefined`、`null`、`boolean`、`number`、`bigint`、`string`、`symbol`。
- 1 种对象类型：`object`。普通对象、数组、日期、正则等都属于对象；函数是具有 `[[Call]]` 内部能力的可调用对象。

所以“对象、数组、函数都统称 object”作为概括不够精确：数组和函数在语言分类上确实属于对象，但 `typeof` 对函数有专门结果 `"function"`。

```js
typeof {};           // "object"
typeof [];           // "object"
typeof function () {}; // "function"
typeof null;         // "object"，这是历史遗留行为

Array.isArray([]);   // true
```

### 如何准确判断类型

```js
function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}
```

- 判断 `null`：使用 `value === null`。
- 判断数组：优先 `Array.isArray(value)`，它也能正确处理跨 iframe 的数组。
- 判断函数：通常使用 `typeof value === "function"`。
- 区分内置对象可使用 `Object.prototype.toString.call(value)`，但业务模型更适合明确字段校验或 Schema 校验。
- `instanceof` 检查原型链，跨 Realm 时可能失效，也不适合判断原始值。

### 数组和函数为什么也是对象

数组是为按序数据设计的特殊对象，拥有索引、`length` 和数组原型方法。索引本质上仍是对象属性，但引擎会针对规范数组进行存储优化。

函数也是对象，可以保存属性，并能通过 `call`、`apply` 或普通调用语法执行：

```js
function greet(name) {
  return `Hello, ${name}`;
}

greet.description = "say hello";
console.log(greet("Ada"));
console.log(greet.description);
```
