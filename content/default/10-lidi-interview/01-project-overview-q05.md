---
id: lidi-202609-project-order-flow
title: 轻购从首页到提交订单的完整流程是什么？
aliases: [购物流程, 下单流程, 首页到订单, 电商业务链路]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [首页, 详情, SKU, 购物车, sessionStorage, 订单确认, 支付]
---

# 轻购从首页到提交订单的完整流程是什么？

## 核心回答

1. 首页加载时，`HomeView` 用 `Promise.all` 同时请求轮播图、公告和商品分组。用户点击商品或轮播图以后，把 `prodId` 放到路由 query，进入商品详情。
2. 商品详情页根据 `prodId` 并行请求商品信息、收藏状态和评论数据。商品信息回来以后，取出图片、SKU 列表和默认 SKU，同时再请求 AI 商品卖点。
3. 用户选择规格和数量后，可以加入购物车，也可以立即购买。加入购物车调用 `/p/shopCart/changeItem`；立即购买则把商品、SKU、数量和店铺信息写进 `sessionStorage` 的 `confirmOrder`。
4. 购物车页面拿到店铺、优惠分组和商品项的嵌套数据后扁平化，用户勾选商品、修改数量或删除商品。提交时把选中的 `basketIds` 和默认地址 ID 写进同一个临时对象。
5. 订单确认页读取 `confirmOrder`，先拿地址，再调用 `/p/order/confirm` 得到商品、运费、优惠和实际支付金额。用户修改备注后，提交 `checkoutItems`、店铺备注和地址。
6. 订单提交成功后得到订单号，前端弹出支付确认框。确认后调用支付接口；取消则保留待付款状态。支付成功后进入“我的”，订单列表再按状态查询订单。
7. 这条链路中，`sessionStorage` 只是跨页面传递本次操作的数据，商品库存、金额和订单状态仍然以后端接口为准。

