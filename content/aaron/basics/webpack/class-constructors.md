---
id: aaron-basic-webpack-class-constructors
title: class 和构造函数有什么区别，静态方法是什么
aliases: [请讲讲：class 和构造函数有什么区别，静态方法是什么, 关于“class 和构造函数有什么区别，静态方法是什么”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: normal
projects: []
keywords: [class, 构造函数, static, 原型]
---

# class 和构造函数有什么区别，静态方法是什么

## 核心回答

class 是更清晰地声明类、原型方法和继承的一套语法，底层仍然依赖原型。constructor 做初始化，普通类方法放在原型上，让实例共享；传统构造函数也能配合 prototype 达到类似效果。

区别是 class 必须用 new 调用，类体按严格模式执行，类声明有暂时性死区。类方法默认不可枚举，而直接给构造函数 prototype 赋值增加的方法通常可枚举。函数声明可以在声明位置之前调用，但函数表达式还要看变量声明方式，不能笼统说所有 function 都完全一样。

static 定义类上的方法或字段，通常通过类名访问，实例不会直接继承这些静态成员；子类构造函数可以继承父类静态成员，也能通过 super 访问。实例属性和静态属性可以同名，因为所在对象不同。

【现代 JavaScript 支持 # 私有字段、私有方法和类内静态字段，不能再说 class 没有这些能力。同一类里普通方法重名通常会覆盖，不是全部报错，但多个 constructor 是语法错误。new.target 可以判断是否被构造调用，以及实际的构造目标。检查原型可以用 Object.getPrototypeOf，Object.getOwnPropertyNames 能取到自己的字符串属性名，包括不可枚举项。】
