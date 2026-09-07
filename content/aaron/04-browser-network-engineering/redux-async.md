---
id: engineering-redux-async
title: Redux 里异步请求放在哪处理？
aliases: [redux异步, redux-thunk, createAsyncThunk, redux-saga]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [thunk, saga, createAsyncThunk, 异步action]
---

# Redux 里异步请求放在哪处理？

## 核心回答

reducer 只根据旧状态和 action 计算新状态，请求这类副作用应该放在外面。使用 thunk 中间件后，可以 dispatch 一个函数，在里面请求数据，再 dispatch 普通 action 更新状态。

Redux Toolkit 的 createAsyncThunk 会为请求生成 pending、fulfilled、rejected 三种 action，slice 可以分别处理加载、成功和失败。

## 追问：旧请求晚返回，怎么避免覆盖新数据？

可以保存当前请求的 requestId，收到结果时只接受匹配的一次。能取消的请求也可以取消。取消和结果校验最好一起考虑，确保旧结果不会在新筛选条件下显示。
