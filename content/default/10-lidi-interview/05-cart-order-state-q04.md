---
id: lidi-202609-cart-flatten
title: 购物车为什么要先把嵌套数据扁平化？
aliases: [cartItems, 嵌套购物车, shopCartItemDiscounts]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [购物车, 扁平化, computed, shopCartItems, basketId]
---

# 购物车为什么要先把嵌套数据扁平化？

## 核心回答

1. 后端返回的结构是按店铺分组的，店铺下面还有优惠分组，优惠分组下面才是商品项。这个结构适合展示店铺和优惠信息，但不适合直接做全选和总价计算。
2. `cartItems` 计算属性遍历每个店铺的 `shopCartItemDiscounts`，再遍历里面的 `shopCartItems`，把商品项放进一个数组。
3. 选中商品 ID、全选状态、数量修改和清空操作都只需要面对这个商品数组，不需要每个功能重新写三层循环。
4. 扁平化不会把后端数据永久改成另一种结构，原始的 `cartList` 仍然保留给模板按店铺和优惠分组展示；这是“展示结构”和“计算结构”分开。
5. 当前部分购物车数据还使用 `any`，继续完善时我会把店铺、优惠分组和商品项分别定义成接口，让这段遍历更安全。

