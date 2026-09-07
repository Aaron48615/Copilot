---
id: lidi-202609-order-confirm
title: 轻购订单确认页具体确认了哪些数据？
aliases: [订单确认, confirmOrder, checkoutItems, 实际支付金额]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [订单确认, 地址, 运费, 优惠, checkoutItems, actualTotal]
---

# 轻购订单确认页具体确认了哪些数据？

## 核心回答

1. 进入订单确认页以后，先读取 `confirmOrder`，再请求地址列表，优先选择默认地址，没有默认地址时使用第一条地址。
2. 如果找到地址，代码会把最新的 `addrId` 写回临时订单参数，再调用 `/p/order/confirm`。这样用户在购物车里进入页面以后，订单确认使用的是最新地址。
3. 确认接口返回店铺、优惠分组、商品、单价、数量、运费、总金额、优惠金额、商品总数和实际支付金额，页面按店铺展示商品，并允许填写订单备注。
4. 如果没有地址，页面仍然可以显示订单信息，但提交时会提示用户先添加收货地址；点击地址区域可以进入地址选择页。
5. 用户提交时，前端从每个店铺取 `shopId` 和备注，再把 `checkoutItems`、地址 ID 和店铺备注传给 `/p/order/submit`。
6. 这里的核心是“确认页不是简单展示购物车”，它要让服务端根据当前商品和地址重新计算一次，避免用户停留期间价格、库存或优惠发生变化。

