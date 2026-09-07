---
id: lidi-202609-import-03-frameworks-react-redux-basics
title: Redux 的核心概念？action、reducer、store 分别是什么？
aliases: [redux基础, redux工作原理, 单向数据流]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [redux, action, reducer, store, dispatch]
---

# Redux 的核心概念？action、reducer、store 分别是什么？

## 核心回答

1. Redux 的 store 保存应用共享状态，action 描述发生了什么，reducer 根据旧状态和 action 计算新状态。比如点击增加商品数量，会派发包含商品编号的动作，reducer 找到对应项产生更新后的数据，订阅者再读取结果刷新界面。

2. action 通常是带 type 的普通对象，还可以携带 payload。它描述事件或意图，不应该把 DOM 节点、函数和请求实例都装进去；内容清楚且可序列化，开发工具中才容易查看、重放和定位是哪一步改变了状态。

3. reducer 应保持纯粹，不直接请求接口、读取随机数或修改外部变量。状态更新遵循不可变原则；Redux Toolkit 的 createSlice 使用 Immer，允许写类似赋值的 draft 操作，但最终仍生成新的状态结果，不是任意修改旧对象。

4. 组件通过 dispatch 发出动作，通过 selector 选择需要的数据。异步过程放在 thunk、RTK Query 等合适位置，成功或失败再触发状态变化；并不是每一个简单同步更新都必须先写一个异步 action。

5. 我会控制全局状态范围，登录信息、跨页面共享的数据适合考虑，局部弹窗和输入草稿通常留在组件。比如筛选面板的展开状态只影响当前页面，可以留在本地；多个页面都要显示的用户资料才需要统一维护，并在退出或切换账号时重置对应数据。

## 追问：为什么 Redux 强调不可变更新？

1. 旧状态应保留原来的含义，方便比较和调试。如果直接改旧对象，历史记录也可能跟着变，订阅比较还可能因为引用没变而跳过更新，出现数据字段变了、界面却没有及时反映的情况。

2. 不可变更新不等于每次深复制整棵树。只复制被修改的路径，未变化的分支继续复用引用；例如更新某个商品数量，只需创建新的商品对象和包含它的新列表，其他商品仍可保持原引用。

3. 使用 Redux Toolkit 可以让这类更新更容易写，但我仍会理解 draft 的使用范围。不要把 draft 传给外部长期保存，也不要在 reducer 外拿到 store 对象后直接改字段，工具并不会自动约束所有访问位置。

## 追问：selector 每次返回一个新对象会有什么影响？

1. React Redux 的 useSelector 默认关注所选结果的引用相等性。若 selector 每次都构造新对象，即使里面字段没变，也可能被认为结果变了，组件随不相关的 store 更新而重复渲染。

2. 可以分别选择几个原始字段，或用合适的记忆化 selector 稳定派生结果，必要时采用 shallowEqual。选择方式取决于结果形状和计算成本，不能为了稳定引用把本应随数据变化的结果永久缓存。

3. 我会检查 selector 是否读取了过多状态，例如只展示用户名却订阅整份用户和订单对象。先缩小输入和返回值，再观察实际更新次数；记忆化只能优化已有依赖关系，不能替代合理的数据选择。
