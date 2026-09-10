---
id: aaron-basic-webpack-generator-yield-next
title: Generator 和 yield、next 怎么理解
aliases: [请讲讲：Generator 和 yield、next 怎么理解, 关于“Generator 和 yield、next 怎么理解”，你会怎样回答？]
category: webpack
difficulty: 进阶
priority: normal
projects: []
keywords: [Generator, yield, next, 迭代器]
---

# Generator 和 yield、next 怎么理解

## 核心回答

Generator 是可以暂停和恢复的函数，用 function* 定义，里面用 yield 暂停。调用它先得到迭代器，不会立即把函数体跑完；调用 next() 才开始或继续执行，结果里有 value 和 done，表示这一步的值以及是否结束。

yield 可以暂停多次，return 则结束正常执行。后续 next(value) 的参数会成为上一次 yield 表达式的结果，第一次 next 传值没有对应的上一处 yield，所以通常没用。yield* 可以把迭代过程委托给另一个可迭代对象，Generator 也能用来实现对象的 Symbol.iterator。

它能用来描述异步流程，但自己并不会自动等待网络请求，还需要执行器或 Saga 这样的工具来驱动。async/await 则把 Promise 的等待和继续执行组织得更直接。

【迭代器的 return() 可以请求提前结束，存在 finally 时仍会执行必要的清理；如果 finally 里还有 yield，也可能不会在第一次 return() 调用就完全结束。】
