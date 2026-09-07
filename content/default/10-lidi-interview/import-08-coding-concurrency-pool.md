---
id: lidi-202609-import-08-coding-concurrency-pool
title: 如何实现一个带并发上限的 Promise 池？
aliases: [并发池, Promise 并发限制, concurrency limit]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [并发池, 限流, Promise, worker]
---

# 如何实现一个带并发上限的 Promise 池？

## 核心回答

1. 我会先约定输入是由任务函数组成的稠密数组，每个函数被调用时才开始工作，并返回覆盖完整工作的 Promise 或普通值。limit 必须是正的安全整数；这里选择全部执行、收集成功和失败结果，输入顺序保持不变，暂不提供取消和重试。

2. 实现时共享一个 next 下标，最多启动 limit 个 worker，每个 worker 等当前任务结束后再取下一个。下标领取发生在 await 之前，同一 JavaScript 执行线程中这几句同步代码不会相互穿插，因此两个 worker 不会领到同一个下标。

3. 下面是教学实现，结果按任务下标写入，try 包住函数调用，能统一处理同步抛错和 Promise 拒绝。Promise.all 在这里等待固定数量的 worker，上限来自 worker 数量；返回项借用了 allSettled 的结果形状，但函数本身不是原生 API 的完整实现。

   ```js
   async function pool(tasks, limit) {
     if (!Number.isSafeInteger(limit) || limit < 1) {
       throw new RangeError('limit must be a positive safe integer');
     }
     let next = 0;
     const results = new Array(tasks.length);
     async function worker() {
       while (next < tasks.length) {
         const i = next++;
         try {
           results[i] = { status: 'fulfilled', value: await tasks[i]() };
         } catch (reason) {
           results[i] = { status: 'rejected', reason };
         }
       }
     }
     await Promise.all(Array.from(
       { length: Math.min(limit, tasks.length) }, () => worker()
     ));
     return results;
   }
   ```

4. 空任务数组会返回空结果，上限大于任务数也只创建必要的 worker，失败任务结束后仍会补位。每个下标只领取一次，调度和结果保存随任务数线性增长；这不包含任务自己的耗时，也不意味着 CPU 密集任务会变成多线程并行。

5. 我会特别强调任务不能启动请求后马上返回 undefined，否则池子会误以为它已经完成，真实请求数仍可能超限。调用期间也不应修改任务数组；如果继续完善，我会增加输入校验、取消约定和测试，而不是直接把这段简化代码当作完整生产组件。

## 追问：如果要求第一个失败后就停止，怎么改？

1. 我会先问清楚停止的是领取新任务，还是要求已经运行的任务也终止。前者可以共享一个失败标记，在捕获第一个错误时设置，worker 每次领取前检查；已经领取的任务仍可能继续完成，不能把两种保证混为一谈。

2. 如果调用方愿意等正在运行的任务结束，可以先记录首个错误、停止领取，等 worker 全部退出后再抛出。错误值可能本身就是 undefined，所以要单独记录是否失败，不能只写 if (error) 来判断，否则某些拒绝会被错当成成功。

3. 如果要求外层尽早拒绝，就需要独立处理后台任务的结算与资源清理，不能让它们变成无人处理的 Promise。真正取消进行中的请求还要任务支持 signal；即便发出取消通知，已经完成的写操作也不会因此自动回滚。

## 追问：给并发池加 AbortSignal，需要检查哪些地方？

1. 我会先处理调用时 signal 已经中止的情况，避免再启动第一批任务；执行中每次领取新任务前也检查。已中止的 signal 不会因新增监听器重新触发过去的事件，因此只监听 abort 而不检查当前状态会漏掉这个入口。

2. 对正在执行的任务，需要把 signal 传进去，让 fetch 等支持取消的操作自行响应。普通 Promise 没有通用的强制停止能力；如果任务忽略信号，池子只能停止后续调度，并按约定等待它结束或让调用方提前离开。

3. 返回约定也要明确：取消后整体拒绝，还是返回已完成结果和未启动标记，不能默默留下结果数组空洞。当操作结算时清理监听器；测试要分别覆盖排队时取消、执行中取消和任务不配合取消，才能知道每种情况提供了什么保证。
