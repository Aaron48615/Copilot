---
id: lidi-202609-react-q05
title: Redux Toolkit 解决了什么问题？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [React19, Hooks, useEffect, Redux Toolkit, memo, 受控组件]
---

# Redux Toolkit 解决了什么问题？

## 核心回答

1. Redux Toolkit 提供了更简洁的 slice、reducer 和 action 写法，减少手动写大量样板代码。
2. 它适合管理跨组件、跨页面共享的状态，比如城市视图里的登录信息、角色和持久化状态。
3. `redux-persist` 可以把部分状态持久化，但我不会把所有页面数据都持久化，否则旧数据可能和新接口结果冲突。
4. Store 里还要保持状态边界清楚，页面自己的临时输入不必为了“统一”而全部放进 Redux。

