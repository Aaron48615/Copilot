---
id: lidi-202609-import-03-frameworks-react-reducer-context-q01
title: 哪些状态不该放 Redux？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useReducer, Context, Redux, 状态管理]
---

# 哪些状态不该放 Redux？

## 核心回答

输入框临时值、弹窗开关、当前 hover、只在一个页面存在的草稿通常放组件里。URL 筛选条件要放 URL，服务端列表数据可以交给请求缓存层。全局 store 只保留真正需要跨页面共享或持久化的状态。

