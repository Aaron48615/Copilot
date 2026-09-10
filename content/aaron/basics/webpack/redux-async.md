---
id: aaron-basic-webpack-redux-async
title: Redux 怎么处理异步请求
aliases: [请讲讲：Redux 怎么处理异步请求, 关于“Redux 怎么处理异步请求”，你会怎样回答？]
category: webpack
difficulty: 进阶
priority: normal
projects: []
keywords: [Redux, Thunk, Saga, 中间件]
---

# Redux 怎么处理异步请求

## 核心回答

Redux 中间件位于 dispatch 到 reducer 的处理链路中，可以查看、处理或者继续转发 action，用来做异步流程、日志和错误记录。普通 reducer 仍然保持同步和纯计算，中间件不是让 reducer 自己变成异步函数。

Thunk 让 dispatch 能接收函数，这个函数可以拿到 dispatch 和 getState，先发请求，再派发成功或失败的普通 action。逻辑简单时比较直观，Redux Toolkit 也提供 createAsyncThunk 帮助组织 pending、fulfilled、rejected 这些状态。

Saga 则用 Generator 和 effects 描述流程。watcher 监听请求 action，worker 执行任务，比如用 call 调接口、put 派发结果，也可以处理并发和取消。流程复杂时集中管理有好处，但要额外理解 yield、effect 和任务关系，不是所有请求都需要上 Saga。

【redux-logger 做日志，redux-promise 处理 Promise 形式的 action；是否使用要看实际需求。Saga 里用不同的请求和结果 action，避免 worker 发出的 action 再触发自己形成死循环。Thunk 和 Saga 都要处理失败、loading 和过期请求，不会因为用了中间件就自动解决所有竞态。】
