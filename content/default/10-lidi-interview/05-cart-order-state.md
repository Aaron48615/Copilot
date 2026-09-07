---
id: lidi-202609-cart-order-state
title: 轻购的购物车、价格联动和订单确认状态是怎么处理的？
aliases: [购物车实现, 购物车嵌套数据, 价格联动, sessionStorage 地址]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [购物车, 嵌套数据, 全选, 数量, 价格, sessionStorage, 订单]
---

# 轻购的购物车、价格联动和订单确认状态是怎么处理的？

## 核心回答

1. 购物车接口返回的是店铺、优惠分组和商品项的嵌套结构。页面通过 `cartItems` 计算属性把 `shopCartItemDiscounts` 里的 `shopCartItems` 扁平化，勾选、全选和总价都基于扁平后的商品项处理。
2. 每个商品项加载后先补一个 `checked = false`。`selectedBasketIds` 根据选中状态得到购物车项 ID，`allChecked` 则判断商品列表非空并且每一项都选中。
3. 选中项变化时，监听 `selectedBasketIds`，调用 `/p/shopCart/totalPay` 让后端重新计算总价。页面上的总金额不是前端把单价简单相加出来的最终金额。
4. 数量变化时，接口传的是数量差值，而不是最终数量。成功以后再把本地数量加上差值；如果数量减到零，就调用删除接口并重新加载购物车。
5. 从购物车提交订单时，前端把选中的 `basketIds` 和默认地址 ID 放到 `sessionStorage` 的 `confirmOrder`，然后跳到订单确认页，订单确认页再重新请求金额。
6. 前端会做选择校验、重复点击保护和页面状态同步，但库存、优惠、运费和最终金额必须以后端重新确认的结果为准。
