---
id: aaron-basic-javascript-this-binding
title: this 怎么判断，call、apply、bind 有什么区别
aliases: [请讲讲：this 怎么判断，call、apply、bind 有什么区别, 关于“this 怎么判断，call、apply、bind 有什么区别”，你会怎样回答？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [this, call, apply, bind]
---

# this 怎么判断，call、apply、bind 有什么区别

## 核心回答

普通函数的 this 主要看怎么调用。obj.fn() 这种方法调用，this 通常就是 obj；new Fn() 是构造调用，this 指向新创建的实例；单独 fn() 调用时，严格模式下 this 是 undefined，浏览器普通非严格模式下通常是 window。把一个方法拿出来单独调用，this 不会自动记住它原来属于哪个对象。

call、apply、bind 都可以给普通函数指定 this。call 和 apply 会立即执行，call 后面的参数逐个传，apply 把参数放进数组或类数组里；bind 则返回一个新函数，可以先绑定 this 和一部分参数，之后再执行。比如给事件回调传方法时，就可以用 bind 固定它需要的上下文。

箭头函数要单独判断，它没有自己的 this，要往定义位置的外层找，这三个方法也改变不了它的 this。

【用 addEventListener 注册普通函数时，this 通常等于事件的 currentTarget；箭头回调仍然看外层。浏览器定时器的普通函数回调通常以 window 为 this，但不能推广到 Node.js 或所有回调。绑定后的函数如果还能被 new，构造调用的 this 会使用新实例，不会用 bind 传入的对象。】
