---
id: aaron-basic-javascript-es6-scope
title: ES6 有哪些新特性，var、let、const 和作用域怎么理解
aliases: [请讲讲：ES6 有哪些新特性，var、let、const 和作用域怎么理解, 关于“ES6 有哪些新特性，var、let、const 和作用域怎么理解”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: high
projects: []
keywords: [ES6, let, const, 作用域, var]
---

# ES6 有哪些新特性，var、let、const 和作用域怎么理解

## 核心回答

ES6 我会先从几类常用能力说起：变量声明增加了 let、const，函数可以写默认参数和剩余参数，也有箭头函数；取数据可以用解构，合并数据可以用展开语法。还有模板字符串、Set 和 Map、Promise、class、模块化 import/export，以及 Symbol、迭代器和 Generator。

变量声明这里，var 是函数作用域，写在普通代码块里不会被那个块限制；let 和 const 有块级作用域，在同一个作用域里不能重复声明。var 在声明前读取通常得到 undefined，而 let、const 从进入作用域到完成声明之间有暂时性死区，提前访问会报错。const 不能重新赋值，但如果保存的是对象，对象的属性仍然可以改，它没有把对象冻结。

作用域决定变量在哪能访问，常见的有全局、函数、块级和模块作用域。查变量时先找自己这一层，再沿外层作用域查找；这个关系主要由代码定义的位置决定，不是调用函数时临时决定的。

箭头函数的特点是写法简洁，而且没有自己的 this，会使用外层的 this；也没有自己的 arguments，可以用 ...args 收集参数。它不能 new，没有用于构造实例的 prototype，也不能用 call、apply、bind 重新绑定 this。所以普通数组处理很适合用箭头函数，但需要根据调用者决定 this 的对象方法，就要考虑普通函数。

【Set 常用来去重，Map 可以用对象等不同类型的值做键。展开和剩余参数都写 ...，但一个是把数据展开，一个是把参数收集起来；箭头函数也不能写成 Generator，不能在它自己的函数体里使用 yield。】

### 四种常见作用域

#### 全局作用域

在脚本顶层声明的标识符可被当前脚本中的代码访问。浏览器经典脚本顶层的 `var` 可能成为 `window` 属性，但顶层 `let`、`const` 不会。因此不要简单认为“全局变量都挂在 window 上”。

#### 函数作用域

函数参数、函数内部的函数声明以及 `var` 声明属于当前函数作用域。函数外无法直接访问这些局部绑定。

#### 块级作用域

`let`、`const`、`class` 在 `{}` 代码块内形成块级作用域；`var` 没有普通块级作用域，仍属于所在函数或全局作用域。

```js
if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // 1
console.log(b); // ReferenceError
```

#### 模块作用域

ES Module 顶层声明只在模块内可见，不会自动成为全局对象的属性。模块默认使用严格模式，并通过 `import`、`export` 显式共享能力。

### 什么是作用域链

JavaScript 使用词法作用域。一个标识符在当前词法环境中找不到时，会沿定义时确定的外层词法环境逐级查找，直到全局环境；如果仍然找不到，通常抛出 `ReferenceError`。

重点是“函数在哪里定义”，不是“在哪里调用”：

```js
const name = "global";

function outer() {
  const name = "outer";

  function printName() {
    console.log(name);
  }

  return printName;
}

function run(fn) {
  const name = "run";
  fn();
}

run(outer()); // "outer"
```

`printName` 定义在 `outer` 中，所以它查找的是 `outer` 的词法环境，不会因为在 `run` 中调用就读取 `run` 的 `name`。

### 变量提升、暂时性死区与遮蔽

- `var` 声明会被提升，并在声明执行前初始化为 `undefined`。
- `let`、`const`、`class` 的绑定也在作用域创建时存在，但声明执行前处于暂时性死区（TDZ），访问会报错。
- 内层声明与外层同名时会遮蔽外层变量。

```js
const value = 1;

{
  // console.log(value); // ReferenceError：内层 value 仍在 TDZ
  const value = 2;
  console.log(value); // 2
}
```

有一个特殊点：`typeof undeclaredName` 返回 `"undefined"`，不会抛错；但对仍处于 TDZ 的变量使用 `typeof` 仍会抛错。
