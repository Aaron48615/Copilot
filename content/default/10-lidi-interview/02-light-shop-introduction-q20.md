---
id: lidi-202609-product-add-buy
title: 轻购里的加入购物车和立即购买有什么区别？
aliases: [加入购物车, 立即购买, confirmOrder]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [addCart, basketIds, orderItem, sessionStorage, SKU]
---

# 轻购里的加入购物车和立即购买有什么区别？

## 核心回答

1. 加入购物车会调用 `/p/shopCart/changeItem`，传入 `basketId: 0`、商品 ID、SKU ID、店铺 ID 和购买数量。成功以后提示“添加购物车成功”，关闭购买面板。
2. 立即购买不需要先把商品放进购物车。它会把商品 ID、SKU ID、数量和店铺 ID 放进 `orderItem`，再和空的 `basketIds`、地址 ID、优惠券字段一起写入 `sessionStorage`。
3. 两种方式都必须使用用户当前选中的 SKU，不能只传商品 ID，否则后端不知道买的是哪种规格。
4. 加入购物车以后，用户还可以回购物车修改数量、勾选其他商品和选择地址；立即购买则直接进入订单确认，流程更短。
5. 两种情况下订单确认页都会重新拿地址和订单金额，不能相信详情页展示的旧价格，也不能把前端传入的金额当成最终值。

