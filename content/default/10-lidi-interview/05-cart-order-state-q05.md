---
id: lidi-202609-cart-total-watch
title: 购物车勾选以后总价是怎么更新的？
aliases: [购物车总价, selectedBasketIds, computed watch]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [selectedBasketIds, allChecked, watch, totalPay]
---

# 购物车勾选以后总价是怎么更新的？

## 核心回答

1. 商品项上有 `checked` 状态，`selectedBasketIds` 这个计算属性只取出选中的 `basketId`，作为总价接口需要的参数。
2. `allChecked` 先判断商品数量大于零，再判断每个商品是否都选中。这样空购物车不会错误地显示成“全选”。
3. 用户勾选或取消商品时，`selectedBasketIds` 变化，watch 会调用 `getCartTotal`。没有选中商品时直接把 `totalPrice` 设为 0，不发无意义请求。
4. 总价接口返回 `totalMoney` 后，页面把它传给 Vant 提交栏。提交栏显示的金额只是服务端根据当前选中项计算的预览。
5. 点击全选时，遍历当前扁平商品数组，把每项的 checked 设成同一个值；清空操作只在全选时出现，并把所有选中的 basket ID 传给删除接口。
6. 订单确认页还会重新确认，所以购物车总价和最终支付金额可能因为库存或优惠变化而不同，最终以后端订单确认结果为准。

