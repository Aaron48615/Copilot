---
id: aaron-basic-browser-promise-async-await
title: Promise、async 和 await 怎么理解
aliases: [请讲讲：Promise、async 和 await 怎么理解, 关于“Promise、async 和 await 怎么理解”，你会怎样回答？]
category: browser
difficulty: 进阶
priority: high
projects: []
keywords: [Promise, async, await, 微任务]
---

# Promise、async 和 await 怎么理解

## 核心回答

Promise 用来表示一个异步操作最终成功或失败的结果，有 pending、fulfilled、rejected 三种状态。一旦成功或失败就不能再变；new Promise 传入的执行器会同步执行，then、catch 的回调则通过微任务执行。

then 会返回新的 Promise，所以能链式调用。回调返回普通值，下一个 then 就收到这个值；返回 Promise，就等待它的结果；抛出错误，则传到后面的错误处理。没有返回值时得到的是 undefined。catch 如果处理完正常返回，可以让后续恢复成功流程，如果又抛错，就继续失败；finally 主要做清理，不用来直接替换正常结果。

多个任务一起处理时，Promise.all 等全部成功，结果按输入顺序排列，有一个失败就拒绝；allSettled 等全部结束，分别给出成功或失败状态，适合允许部分失败的页面。race 取最先落定的结果，成功失败都算；any 等第一个成功，全部失败才拒绝。

【Promise 不会自动取消底层请求，all 失败也不会自动停止其他任务。resolve 一个仍在等待的 Promise 时，会采纳它后续的状态，所以“调用 resolve 后立刻 fulfilled”也不准确。】

async/await 是在 Promise 基础上，把异步流程写得更连贯。async 函数一定返回 Promise，return 的普通值会成为成功结果，未捕获的错误会导致拒绝。执行到 await 时，暂停的是当前异步函数后面的代码，主线程仍然能处理其他工作；失败时可以用 try/catch 捕获。

【await 后面是普通值时也会把后续执行安排到之后；它不仅能写在 async 函数内部，ES 模块还支持顶层 await。多个互不依赖的请求可以先一起发，再用 Promise.all 等待，避免无意义地一个接一个等待。】
