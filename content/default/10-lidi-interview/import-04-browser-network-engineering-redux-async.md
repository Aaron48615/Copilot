---
id: lidi-202609-import-04-browser-network-engineering-redux-async
title: Redux 里异步请求放在哪处理？
aliases: [redux异步, redux-thunk, createAsyncThunk, redux-saga]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [thunk, saga, createAsyncThunk, 异步action]
---

# Redux 里异步请求放在哪处理？

## 核心回答

1. Redux 的 reducer 保持纯计算，根据原状态和 action 算出新状态。请求、计时器这类副作用放在 reducer 外面。基础 `dispatch` 处理普通 action，中间件可以扩展它吃什么。比如 thunk 允许先接收一个函数，再在函数里派发状态变化。

2. 项目里用过 Redux Toolkit 的 `createAsyncThunk`。它围着一个异步函数，生成 pending、fulfilled、rejected 这些 action。slice 在 `extraReducers` 里分别处理等待、结果和错误，组件按状态渲染。请求状态不会零散写在好几个地方。

3. `createAsyncThunk` 不会自动做完所有缓存和去重。条件切得很快，旧请求可能晚回来。结合 `requestId` 或查询键决定能不能更新状态，必要时把取消用的 `signal` 传进去。只有一个 loading 字段，挡不住竞态。

4. 主要需求是服务端数据查询、缓存、失效，可以看 RTK Query；更一般的业务操作仍可用 thunk。选方案看现有项目复杂度。简单列表为了 saga 或其他工具多一层学习和维护，常常不值。

5. 组件要根据某次提交结果继续走，注意 `dispatch` 异步 thunk 的返回约定，可以用 `unwrap` 拿到结果或抛出失败。错误分类、重复提交、服务端幂等还是要自己定，状态统一放进 store 不会自动解决。连续点保存，还得限制重复触发，服务端也要防重复写入。只改按钮旁边的加载提示不够。

## 追问：createAsyncThunk 为什么失败后外面的 catch 没执行？

1. 它派发后返回的 Promise，默认会以最终那个 action 完成，可能是 fulfilled，也可能是 rejected action。这跟普通请求 Promise 被拒绝不是一回事。直接 `await dispatch` 再套 `catch`，不一定按预期抓住请求失败。

2. 组件需要成功后跳转、失败后展示字段错误，可以对 dispatch 的返回值用 `unwrap`，成功拿到 payload，失败时抛出对应错误。业务校验失败也可以按约定用 `rejectWithValue`，调用方拿到能展示的结构化信息。

3. store 里的错误状态，和这一次调用的结果，要分开看，避免组件重复弹窗。测的时候覆盖网络错误、服务端校验失败、取消。确认每种情况都不会被当成提交成功，用户主动取消也不要显示成严重故障。

## 追问：同一个列表切换筛选条件，怎样防止旧请求覆盖？

1. 发出请求时记下查询条件和 `requestId`，结果回来时确认它还对应当前展示的那次查询。先查 A 再查 B，A 后到，不能直接写入当前列表。它本身可能是成功的，但已经不是现在要的结果。

2. 希望缓存多个条件，就按查询键分别存，别把所有响应塞进一个数组。当前页面只订阅对应键的数据，loading 和 error 也按这个范围管。旧请求结束时，别把新查询的等待状态提前清掉。

3. 取消旧请求能少浪费，结果归属还是要检查。故意让 A 比 B 慢，再测返回 A 条件、失败、组件卸载。缓存复用和最新页面状态都要对。只在顺序返回时看起来正常，竞态仍可能在。
