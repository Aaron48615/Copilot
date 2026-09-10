---
id: aaron-basic-javascript-prototypes-inheritance
title: 原型、原型链和继承怎么联系起来理解
aliases: [请讲讲：原型、原型链和继承怎么联系起来理解, 关于“原型、原型链和继承怎么联系起来理解”，你会怎样回答？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [原型, 原型链, 继承]
---

# 原型、原型链和继承怎么联系起来理解

## 核心回答

原型的作用是让多个对象共享属性和方法。用构造函数创建实例时，实例的原型通常指向构造函数的 prototype。读取一个属性，会先查实例自己，没有再沿原型一层层找，通常经过 Object.prototype，最后到 null，仍然没有才得到 undefined。

这里容易混的是两个方向：构造函数的 prototype 是给实例共享方法的对象；实例自身的原型关系可以用 Object.getPrototypeOf 查看。__proto__ 是历史访问方式，不是说每个对象都一定能直接用它；箭头函数也没有构造用途的 prototype。

继承就是利用这套共享关系，再处理好实例自己的数据。原型链继承让子类原型指向父类实例，方法能复用，但放在这个父类实例上的数组等数据会被多个子类实例共享。借用构造函数是在子类里执行 Parent.call(this)，让每个实例有自己的属性，但单靠这一步继承不到父类原型上的方法。组合继承把两者放一起，不过会调用两次父构造函数。

寄生组合继承会用 Object.create(Parent.prototype) 建立原型关系，再在子构造函数里调用父构造函数，避免为了建立原型而额外执行一次父构造函数。实际写类时可以用 class extends 和 super，底层仍然离不开原型链。

【还有实例继承，也就是返回一个加了新功能的父类实例；拷贝继承则是把属性或方法复制过来，但不一定建立原型关系。多次 call 只能混入多个构造函数的初始化逻辑，不等于建立多条原型链。constructor 是可以修改的普通属性，重设 prototype 后通常会把它修回子构造函数。】

```js
function Child(name) { Parent.call(this, name); }
Child.prototype = Object.create(Parent.prototype);
Object.defineProperty(Child.prototype, 'constructor', {
  value: Child, writable: true, configurable: true
});
```

这段是假设已经定义 Parent 后，建立传统寄生组合继承的关键部分。
