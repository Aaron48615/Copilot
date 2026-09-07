---
id: lidi-202609-import-03-frameworks-react-reducer-context-q03
title: Context 性能怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useReducer, Context, Redux, 状态管理]
---

# Context 性能怎么处理？

## 核心回答

拆分 Provider，保持 value 引用稳定，或者让 Context 只提供 dispatch，把读取交给更细粒度的 selector。优化前先测量，不要看到 Context 就直接换库。

