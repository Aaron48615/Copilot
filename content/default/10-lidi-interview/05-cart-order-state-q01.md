---
id: lidi-202609-cart-order-state-q01
title: 为什么不用一个全局状态管理库保存所有购物车数据？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [购物车, 嵌套数据, 全选, 数量, 价格, sessionStorage, 订单]
---

# 为什么不用一个全局状态管理库保存所有购物车数据？

## 核心回答

1. 当前轻购没有用 Pinia 保存购物车，页面状态主要用 `ref`、`computed` 和 `watch` 管理，购物车数据的真实来源还是后端接口。
2. 购物车页面和订单确认页面之间只需要传一次购物车 ID、地址 ID 或立即购买的商品信息，所以项目用 `sessionStorage` 保存 `confirmOrder`，比为了这一次跳转引入全局 Store 更直接。
3. 如果以后购物车角标、商品收藏和多个页面都需要实时共享，可以再抽出 Pinia；但即使有 Store，进入订单确认时仍然应该重新向服务端确认价格和库存。
4. 我会按数据生命周期选择位置：组件内部状态放 `ref`，计算结果放 `computed`，同一标签页跨页面的临时数据放 `sessionStorage`，服务端商品和订单数据在关键步骤重新请求。
