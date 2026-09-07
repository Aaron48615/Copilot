---
id: lidi-202609-order-payment-flow
title: 轻购的订单提交、取消支付和支付失败怎么处理？
aliases: [支付流程, payOrder, 订单号, 待付款]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [submitOrder, payOrder, orderNumbers, showConfirmDialog]
---

# 轻购的订单提交、取消支付和支付失败怎么处理？

## 核心回答

1. 先调用 `submitOrder`。如果成功，代码从返回值里取 `orderNumbers` 或 `orderNumber`；如果没有拿到订单号，就提示提交成功但没有支付流水号，不继续盲目支付。
2. 拿到订单号后先删除 `sessionStorage` 里的 `confirmOrder`，因为这次订单已经提交，不应该再用旧参数重复创建订单。
3. 然后弹出确认支付对话框。用户取消时不当成报错，而是提示订单已经进入待支付，并跳到“我的”页面。
4. 用户确认以后调用 `payOrder`，传订单号和 `payType: 1`。接口抛异常或返回 `success: false` 时给失败提示，不跳成支付成功。
5. 支付成功后提示用户，并用 `router.replace('/mine')` 回到订单入口。订单列表页面还可以继续查看状态或再次支付。
6. 当前项目完成的是前端订单支付流程，不是第三方支付平台的完整接入。真实支付还需要服务端回调、验签、幂等和最终状态确认。

