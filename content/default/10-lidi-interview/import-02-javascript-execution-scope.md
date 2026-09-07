---
id: lidi-202609-import-02-javascript-execution-scope
title: 执行上下文、词法环境和作用域链怎么理解？
aliases: [执行上下文, 词法环境, 作用域链]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [执行上下文, 词法环境, 作用域, 作用域链]
---

# 执行上下文、词法环境和作用域链怎么理解？

## 核心回答

执行上下文是代码运行时的一组环境，包含当前变量、函数声明、this 和外部引用；词法环境记录标识符与值的绑定，作用域链则是当前环境沿外层环境逐层查找的路径。函数定义在哪里决定它能看到哪些外层变量，函数在哪里调用主要影响 this。把这几个概念分开，闭包、块级作用域和 hoisting 的问题就不会混成一句“都在栈里”。
