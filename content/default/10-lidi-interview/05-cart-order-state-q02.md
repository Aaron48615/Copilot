---
id: lidi-202609-cart-order-state-q02
title: 前端自己计算价格安全吗？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [购物车, 嵌套数据, 全选, 数量, 价格, sessionStorage, 订单]
---

# 前端自己计算价格安全吗？

## 核心回答

1. 前端可以在选中商品时请求 `/p/shopCart/totalPay`，让用户马上看到金额，这部分是为了交互体验，不是建立可信价格。
2. 当前项目的总价接口接收选中的 `basketIds`，由后端返回 `totalMoney`，比前端只拿商品单价相加更可靠，因为后端还可能考虑库存、优惠和运费。
3. 订单确认页还会调用 `/p/order/confirm`，显示总金额、优惠金额、商品数量、运费和实际支付金额；提交订单以后，后端还会再次确认。
4. 用户可以改前端代码或直接构造请求，所以最终订单金额不能相信前端传来的数字。前端传商品标识、数量、地址和备注，后端必须重新计算并以自己的结果为准。
