---
id: lidi-202609-javascript-core-q06
title: Event Loop 是什么？
aliases: [事件循环、宏任务和微任务是什么, JavaScript 事件循环是怎样执行的, event loop, 事件循环, 宏任务和微任务, js执行顺序]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Event Loop, 宏任务, 微任务, Promise, setTimeout, 调用栈]
---

# Event Loop 是什么？

Event Loop 就是 JavaScript 处理异步任务的一套机制。

因为 JavaScript 主线程一次只能执行一个任务，所以像 `setTimeout`、网络请求这些异步操作，不会一直阻塞主线程。

执行代码的时候，同步任务会先进入调用栈执行。异步任务完成之后，会把对应的回调放到任务队列里，等调用栈清空之后，Event Loop 再把这些任务拿出来执行。

这里还会分宏任务和微任务。

常见的宏任务有 `setTimeout`、`setInterval`，常见的微任务有 `Promise.then`、`queueMicrotask`。

它们的执行顺序一般是：

先执行同步代码，
然后清空当前所有微任务，
再执行一个宏任务，
宏任务执行完之后，再清空微任务，
然后继续下一轮 Event Loop。

比如：

```js
console.log(1)

setTimeout(() => {
  console.log(2)
})

Promise.resolve().then(() => {
  console.log(3)
})

console.log(4)
```

最后输出是：

```text
1
4
3
2
```

因为 `1` 和 `4` 是同步任务，先执行；`Promise.then` 是微任务；`setTimeout` 是宏任务，所以微任务会先于 `setTimeout` 执行。

所以我理解 Event Loop 的核心，就是协调同步任务、微任务和宏任务的执行顺序，让 JavaScript 在单线程的情况下也能处理异步操作。
