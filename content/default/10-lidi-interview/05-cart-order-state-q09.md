---
id: lidi-202609-order-list-pagination
title: 我的订单页面的分页和状态切换是怎么做的？
aliases: [订单列表, 分页加载, 待付款待发货]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [MyOrderView, van-list, order status, current, finished]
---

# 我的订单页面的分页和状态切换是怎么做的？

## 核心回答

1. 订单页面有待付款、待发货、待收货和已完成四个 Tab，分别对应后端状态 1、2、3、5。每个 Tab 都有自己的页码、loading、finished 和列表状态。
2. 当前 Tab 加载时把页码加一，调用 `getMyOrderInfo`，每页传 10 条。第一页直接替换列表，后续页拼接到原列表后面。
3. 如果接口返回空数组、当前页达到总页数，或者最后一页不足 10 条，就把 `finished` 设为 true，Vant List 不再继续触发加载。
4. 切换 Tab 时先重置目标 Tab 的状态，再加载第一页，避免把上一个状态的订单混到新的状态里。
5. 待付款订单可以再次调用支付；待收货订单可以确认收货。成功以后刷新当前 Tab，而不是只在前端修改状态。
6. 这样每个订单状态都以后端数据为准，前端只负责分页、展示和触发动作。

