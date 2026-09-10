---
id: aaron-basic-webpack-promise-combinators
title: Promise 的状态、链式调用和组合方法
aliases: [请讲讲：Promise 的状态、链式调用和组合方法, 关于“Promise 的状态、链式调用和组合方法”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: normal
projects: []
keywords: [Promise, 链式调用, all, allSettled]
---

# Promise 的状态、链式调用和组合方法

## 核心回答

Promise 用来表示一个异步操作最终成功或失败的结果，有 pending、fulfilled、rejected 三种状态。一旦成功或失败就不能再变；new Promise 传入的执行器会同步执行，then、catch 的回调则通过微任务执行。

then 会返回新的 Promise，所以能链式调用。回调返回普通值，下一个 then 就收到这个值；返回 Promise，就等待它的结果；抛出错误，则传到后面的错误处理。没有返回值时得到的是 undefined。catch 如果处理完正常返回，可以让后续恢复成功流程，如果又抛错，就继续失败；finally 主要做清理，不用来直接替换正常结果。

多个任务一起处理时，Promise.all 等全部成功，结果按输入顺序排列，有一个失败就拒绝；allSettled 等全部结束，分别给出成功或失败状态，适合允许部分失败的页面。race 取最先落定的结果，成功失败都算；any 等第一个成功，全部失败才拒绝。

【Promise 不会自动取消底层请求，all 失败也不会自动停止其他任务。resolve 一个仍在等待的 Promise 时，会采纳它后续的状态，所以“调用 resolve 后立刻 fulfilled”也不准确。】
