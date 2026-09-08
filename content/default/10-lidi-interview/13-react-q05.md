---
id: lidi-202609-react-q05
title: Redux 和 Redux Toolkit 是什么？
aliases: [Redux Toolkit 解决了什么问题, Redux 的核心概念, action、reducer、store, redux基础, redux工作原理, 单向数据流]
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [Redux, Redux Toolkit, RTK, store, action, reducer, dispatch, createSlice, configureStore, react-redux, redux-persist]
---

# Redux 和 Redux Toolkit 是什么？

Redux 是一个全局状态管理库，我一般会用它来管理多个组件都需要共享的数据，比如用户信息、登录状态或者一些全局业务状态。

Redux 里面几个核心概念是 `store`、`state`、`action`、`reducer` 和 `dispatch`。

`store` 用来保存全局状态，组件通过 `dispatch` 发送一个 action，reducer 根据 action 计算出新的 state，然后组件拿到新的状态重新渲染。

在 React 里面一般会配合 `react-redux` 使用。读取状态我会用 `useSelector`，修改状态会用 `useDispatch` 去派发 action。

现在实际项目里我会更倾向于用 Redux Toolkit，也就是 RTK。它是 Redux 官方推荐的现代写法，本质上还是 Redux，只是把很多原来比较繁琐的写法封装掉了。

城市视图就是这么做的。项目用 RTK 的 `configureStore` 创建 store，再用 `createSlice` 拆了两个模块：`auth` 管 token 和用户信息，`app` 管亮暗主题。登录成功后 `dispatch(setAuth({ token, user }))`，退出或者接口返回 401 时 `dispatch(clearAuth())`，主题切换走 `toggleTheme`。布局、登录守卫、个人中心里用 `useSelector` 读用户和主题，请求拦截器也会从 store 里取 token 带到请求头上。图表、仪表盘这些页面数据没有进 Redux，还是页面自己请求、自己管。

另外项目还用了 `redux-persist`，把 `auth` 和 `app` 都持久化到 localStorage，刷新之后登录态和主题还能恢复。接口请求本身还是 Axios，没有用 RTK Query，也没有 `createAsyncThunk`。

RTK 里面我比较常用的就是 `configureStore` 和 `createSlice`。

`configureStore` 用来创建 store，相比以前的 `createStore` 配置更简单，而且默认已经配置了一些常用功能，比如 thunk 和 Redux DevTools。`createSlice` 可以把 state、reducer 和 action 放在一起定义，并且会自动生成对应的 action。

比如城市视图里，我会先通过 `createSlice` 定义 `auth` 模块，在里面定义初始 state，以及 `setAuth`、`clearAuth` 这些 reducers，然后把这个 slice 的 reducer 注册到 `configureStore` 里面。组件里再通过 `useSelector` 获取数据，通过 `dispatch(setAuth(...))` 这种方式修改状态。

Redux 和 RTK 最大的区别主要是写法。

传统 Redux 通常需要自己定义 action type、action creator、reducer，还要手动处理不可变数据，代码会比较多。

RTK 通过 `createSlice` 把这些整合到一起，而且内部使用 Immer，所以 reducer 里面可以写类似 `state.user = data` 这种代码，最终仍然会正确生成不可变更新。

所以如果现在让我做一个新的 React 项目，需要 Redux 做全局状态管理，我会直接选择 Redux Toolkit。Redux 的核心思想还是需要理解，但是实际开发一般使用 RTK。
