---
id: lidi-202609-import-03-frameworks-react-server-state-q01
title: 为什么派生数据不再存一份？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [server state, cache, React, 请求, UI state]
---

# 为什么派生数据不再存一份？

## 核心回答

比如商品总价可以由购物车项和价格计算出来，重复存一份会产生两个真相，任何一处漏更新都会显示不一致。只保存最小源数据，在 render 或 selector 里派生；如果计算真的很重，再用 memo 做性能优化。服务端价格仍要重新计算，前端派生值不能拿来结算。

