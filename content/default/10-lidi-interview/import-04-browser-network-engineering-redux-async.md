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

1. Redux 的 reducer 应保持纯计算，根据原状态和 action 得到新状态，请求、计时器等副作用放在 reducer 外。基础 dispatch 处理普通 action，中间件可以扩展它的输入，例如 thunk 允许先接收一个函数，再在函数里派发状态变化。

2. 项目里使用过 Redux Toolkit 的 createAsyncThunk，它围绕异步函数生成 pending、fulfilled 和 rejected action。slice 在 extraReducers 中分别处理等待、结果和错误，组件根据状态渲染，这样不会把请求状态零散地写在多个地方。

3. 但 createAsyncThunk 不会自动完成所有缓存和去重。快速切换条件时旧请求可能晚回来，我会结合 requestId 或查询键决定能否更新状态，必要时传递取消 signal；仅仅有 loading 字段还不能避免竞态。

4. 如果主要需求是服务端数据查询、缓存和失效管理，可以考虑 RTK Query；更一般的业务操作仍可用 thunk 等方式。选方案要看现有项目复杂度，不能因为知道 saga 或其他工具就给简单列表增加不必要的学习和维护成本。

5. 组件需要根据某次提交结果继续操作时，要注意 dispatch 异步 thunk 的返回约定，可以用 unwrap 取得结果或抛出失败。错误分类、重复提交和服务端幂等仍需明确，这些不会因为状态统一放进 store 就自动解决。比如连续点击保存，还要限制重复触发并让服务端防止重复写入，不能只改变按钮旁边的加载提示。

## 追问：createAsyncThunk 为什么失败后外面的 catch 没执行？

1. 它派发后的返回 Promise 默认会以最终 action 完成，可能是 fulfilled action，也可能是 rejected action，不等同于普通请求 Promise 的拒绝行为。因此直接 await dispatch 后套 catch，不一定按预期捕获请求失败。

2. 如果组件需要成功后跳转、失败后显示字段错误，可以对 dispatch 返回值使用 unwrap，得到成功 payload，失败时抛出对应错误。业务校验失败也可按约定使用 rejectWithValue，让调用方拿到可展示的结构化信息。

3. 我会同时区分 store 中的错误状态和这一次调用的结果，避免组件重复弹窗。测试时包含网络错误、服务端校验失败和取消，确认每种情况都不会被误判为提交成功，也不会把用户主动取消显示成严重故障。

## 追问：同一个列表切换筛选条件，怎样防止旧请求覆盖？

1. 发起请求时记录查询条件和 requestId，接收结果时确认它仍对应当前展示的查询。比如先查 A 再查 B，A 后返回时不能直接写入当前列表，即使它本身是成功请求，也已经不是当前需要的结果。

2. 如果希望缓存多个条件，可以按查询键分别存储，而不是把所有响应塞进一个数组。当前页面只订阅对应键的数据，loading 和 error 也要按这个范围管理，避免旧请求结束时把新查询的等待状态提前清掉。

3. 取消旧请求可以减少浪费，但仍需要结果归属检查。验证时故意让 A 慢于 B，并测试返回 A 条件、失败和组件卸载，确认缓存复用与最新页面状态都符合预期，而不是只在顺序返回时看起来正常。
