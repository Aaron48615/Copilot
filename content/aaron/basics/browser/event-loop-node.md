---
id: aaron-basic-browser-event-loop-node
title: 浏览器事件循环怎么执行，和 Node.js 有什么区别
aliases: [请讲讲：浏览器事件循环怎么执行，和 Node.js 有什么区别, 关于“浏览器事件循环怎么执行，和 Node.js 有什么区别”，你会怎样回答？]
category: browser
difficulty: 进阶
priority: high
projects: []
keywords: [事件循环, 微任务, Node.js, 定时器]
---

# 浏览器事件循环怎么执行，和 Node.js 有什么区别

## 核心回答

浏览器主线程的 JavaScript 通常一次执行一个任务，网络和计时由运行环境配合完成。当前任务里的同步代码执行完，调用栈空下来后，会执行微任务检查，把队列中的微任务处理完，再在合适时机渲染或继续处理后面的任务。

setTimeout、setInterval 和消息事件回调属于常见任务，Promise 的 then、catch、await 后续和 queueMicrotask 属于微任务，MutationObserver 的通知也通过微任务处理。微任务里再加入微任务，通常也会在这次检查中继续处理，所以不停添加微任务可能让页面没有机会渲染。

```js
console.log(1);
setTimeout(() => console.log(4), 0);
Promise.resolve().then(() => console.log(3));
console.log(2);
// 1、2、3、4
```

定时器的 0 也不是立刻执行，只表示满足计时条件后可以被调度，前面的任务仍然要先完成。浏览器也不是只有一个统一任务队列，面试里的“宏任务队列”是方便理解的简化说法。

【Node.js 基于自己的事件循环阶段处理工作，常见有 timers、pending callbacks、idle/prepare、poll、check、close callbacks，I/O 常和 poll 相关，setImmediate 对应 check。process.nextTick 是 Node 特有的调度机制，不是浏览器 API；它和 Promise 微任务的顺序还要结合执行上下文分析，不能把浏览器与 Node 的所有规则混成一张固定顺序表。】
