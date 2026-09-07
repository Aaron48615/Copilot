---
id: lidi-202609-city-dashboard-data-q03
title: 为什么不把所有数据都放进 Redux？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [React, Redux Toolkit, ECharts, Promise.all, 仪表盘, CSV]
---

# 为什么不把所有数据都放进 Redux？

## 核心回答

1. Redux 适合跨页面共享、需要统一维护的数据，比如登录状态、用户角色和全局筛选条件。
2. 图表的临时配置、弹窗开关和某个页面的输入内容，放在组件内部更容易理解，也能减少全局状态更新。
3. 如果把所有东西都放进 Redux，状态结构会变得很大，组件修改一个小值也可能让不相关的订阅重新计算。
4. 我的原则是先按数据生命周期分层，再决定放局部状态、Context、Redux 还是服务端缓存。

