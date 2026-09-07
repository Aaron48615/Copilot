---
id: js-promise-all-error
title: Promise.all 里一个请求失败了会怎样？
aliases: [promise.all失败, allSettled, 并行请求错误处理, promise并发]
category: javascript
difficulty: 高频
priority: high
projects: []
keywords: [Promise.all, allSettled, 降级, 并行请求]
---

# Promise.all 里一个请求失败了会怎样？

## 核心回答

Promise.all 要等所有输入都成功才成功，只要其中一个失败，返回的 Promise 就会失败。其他已经开始的请求不会因此自动取消。

如果几个结果缺一不可，可以用 all 统一处理失败。如果首页几个区域互不依赖，用 allSettled 更合适：分别检查每个结果，成功的正常展示，失败的单独提示。

## 追问：想让一个请求失败时返回默认值，可以怎么写？

可以在传给 Promise.all 之前，对那个请求单独 catch，返回明确的默认值。这样整组不一定失败，但调用方要能区分真实数据和默认数据，不能把请求失败伪装成业务上确实没有数据。
