---
id: lidi-202609-import-04-browser-network-engineering-promise-chain
title: 说说 Promise 的状态和链式调用
aliases: [promise原理, promise状态, promise链式, then返回值]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Promise, then, 链式调用, 微任务]
---

# 说说 Promise 的状态和链式调用

## 核心回答

1. Promise 描述一个异步结果，状态有 pending、fulfilled 和 rejected，确定后不会再次改变。不过 resolve 接收另一个 Promise 时，会跟随它的最终结果，因此调用 resolve 不总是意味着此刻已经 fulfilled，这个边界容易混淆。

2. then 每次返回新的 Promise，回调返回普通值时，新 Promise 用这个值完成；返回 Promise 或 thenable 时会等待其结果，抛异常则进入拒绝状态。连续请求如果存在依赖，要把内部 Promise return 出去，后续步骤才会正确等待。

3. 错误会沿链寻找对应拒绝处理器，catch 可以集中处理前面传播来的错误。但 catch 如果正常返回一个值，就相当于恢复为成功，后面的 then 会继续执行；若只是记录错误但仍希望调用方失败，需要重新抛出。

4. Promise 的执行器在构造时同步运行，then 和 catch 的反应回调通过微任务执行，即使结果已确定也不会插进当前同步代码中。Promise 并不创建一个计算线程，把大循环放进去仍可能阻塞页面。

5. 业务上我会区分串行、并行和取消：无依赖请求可以并行，有依赖再串联，取消通常由 AbortController 等具体操作支持。async/await 让这种控制流更易读，但底层仍涉及 Promise，异常处理和遗漏 await 的问题不会自动消失。例如查询失败后是否还能显示旧内容，需要调用方明确选择，不能靠 catch 无意返回 undefined 来决定。

## 追问：then 里忘记 return，会发生什么？

1. 如果回调启动一个请求却不返回它，外层新 Promise 会用 undefined 完成，不会等待这个请求。后面的 then 可能提前执行，拿不到预期数据，而内部请求失败也可能绕过外层 catch，成为未处理拒绝。

2. 例如先查询用户再查订单，第二步依赖用户标识，就应 return 查询订单的 Promise，或者在 async 回调里 await 并返回结果。只是把请求写在花括号里面，不代表外层链条自动知道它属于依赖流程。

3. 我会通过延迟和失败场景验证执行顺序，确保外层 loading 覆盖真正的整个操作。类型检查能帮助发现部分返回值问题，但副作用型回调也可能合法返回 void，因此仍要理解这段链条究竟应该等待什么。

## 追问：finally 返回值会改变前面的结果吗？

1. finally 主要用于无论成功失败都要进行的清理，它的普通返回值通常不会替换前面的值或错误。例如关闭 loading 后返回一个字符串，后续仍会接到原先的成功结果，而不是这个字符串。

2. 但 finally 自己抛异常，或返回一个拒绝的 Promise，会让后续变为这个新的失败；返回尚未完成的 Promise 也会让链等待。因此在 finally 里做可能失败的异步清理时，要注意它是否会遮住原始错误。

3. 我会把必要清理保持简单，记录清理异常时避免覆盖更有价值的业务失败。对重叠请求还要确认关闭的是当前请求对应的 loading，不能因为用了 finally 就认为并发状态一定正确。
