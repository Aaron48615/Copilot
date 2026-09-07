---
id: lidi-202609-import-02-javascript-execution-scope-q01
title: 闭包到底保存了什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [执行上下文, 词法环境, 作用域, 作用域链]
---

# 闭包到底保存了什么？

## 核心回答

闭包不是把整个作用域复制一份，而是让函数继续引用它定义时需要的词法环境。外层函数返回后，只要闭包还活着，那些绑定就不会被回收。循环里用 let 每次迭代有自己的绑定，用 var 则通常共享同一个绑定，所以定时器最后读到相同值。
