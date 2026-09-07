---
id: lidi-202609-import-03-frameworks-react-reducer-context-q02
title: reducer 里为什么不能请求接口？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useReducer, Context, Redux, 状态管理]
---

# reducer 里为什么不能请求接口？

## 核心回答

reducer 需要是纯函数，同样的旧 state 和 action 应该得到同样的新 state。请求、时间、随机数都会让结果不可预测，也无法可靠重放。异步放在 thunk、effect 或专门的数据层，成功后再 dispatch 结果。

