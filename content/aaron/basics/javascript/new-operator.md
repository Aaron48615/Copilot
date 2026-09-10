---
id: aaron-basic-javascript-new-operator
title: new 一个对象时底层发生了什么？
aliases: [new 调用构造函数时做了哪些事？, 构造函数主动返回值会影响 new 的结果吗？]
category: javascript
difficulty: 基础
priority: high
projects: []
keywords: [new, 构造函数, prototype, this, 返回值]
---

# new 一个对象时底层发生了什么？

## 核心回答

拿普通构造函数来说，new 会先创建一个对象，让它的原型关联到构造函数的 prototype。然后把这个新对象作为 this，执行构造函数里的代码，比如给它加上 name、age 这些属性。

最后还要看构造函数有没有主动返回对象。如果返回的是一个对象或函数，就用那个返回值；如果没有返回值，或者只是返回数字、字符串这些基本值，就还是得到刚才创建的实例。

我比较喜欢把这几步和原型链一起理解，容易记清属性和方法分别从哪来：实例自己的属性在初始化时加，大家共用的方法可以沿原型找到。另外，箭头函数不能拿来 new，这个过程也不能直接用普通函数调用去模拟所有 class 和内置对象。
