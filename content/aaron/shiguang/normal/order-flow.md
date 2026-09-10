---
id: shiguang-normal-order-flow
title: 确认订单和订单列表
aliases: [能讲讲项目中的确认订单和订单列表吗？, 关于确认订单和订单列表，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [basketId, 订单状态, 分页]
---

# 确认订单和订单列表

## 核心回答

确认订单分两种情况：从购物车进来，带的是选中的 basketId；立即购买带的是商品 ID、SKU ID、数量和店铺 ID。确认页拿到这些参数后，再向服务端请求商品、地址和金额，提交时把各店铺的备注整理好，拿到订单号后再让用户选择要不要继续支付。

订单列表有待付款、待发货、待收货和已完成四个标签，每个标签分别保存列表、页码和加载状态。第一次打开查第一页，滑到底再加载，切回来不用把已有列表重新清掉。付款或确认收货后，会重新加载当前标签。

【我做的是前端的确认、提交和支付接口调用。最终的金额、库存、订单状态和支付结果都是服务端负责，不能说整个支付系统都是我做的。】

## 回答要点

- 确认订单分两种情况：从购物车进来，带的是选中的 basketId；立即购买带的是商品 ID、SKU ID、数量和店铺 ID。
- 订单列表有待付款、待发货、待收货和已完成四个标签，每个标签分别保存列表、页码和加载状态。
- 我做的是前端的确认、提交和支付接口调用。最终的金额、库存、订单状态和支付结果都是服务端负责，不能说整个支付系统都是我做的。

## 面试官可能追问

- 确认订单前为什么还要重新请求金额和库存？
- 付款接口返回 HTTP 200 能否直接提示支付成功？

## 代码证据

> **代码依据（不用于口述）**
> - [确认订单第 120～165 行](/Users/aaron/personal-hub/apps/project-2/src/views/Order.vue:120)：读取结算参数、请求确认信息、地址和金额展示。
> - [确认订单第 168～215 行](/Users/aaron/personal-hub/apps/project-2/src/views/Order.vue:168)：按店铺整理备注、提交订单和支付接口调用。
> - [订单列表第 105～139 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:105)：四种订单状态及每个标签自己的分页状态。
> - [订单列表第 142～192 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:142)：标签切换、首次加载、分页追加和状态保存。
> - [订单列表第 194～242 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:194)：付款、确认收货和重新加载当前标签。
