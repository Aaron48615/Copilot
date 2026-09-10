---
id: shiguang-normal-shopping-cart
title: 购物车
aliases: [能讲讲项目中的购物车的状态与计价流程吗？, 关于购物车的状态与计价流程，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [购物车, computed, 服务端计价]
---

# 购物车

## 核心回答

购物车接口的数据分了店铺、优惠分组和商品几层。我先整理成一个店铺下面对应一组商品，再给每件商品加上 checked。店铺全选、半选、页面全选和已选 ID 都从商品的勾选状态算出来，这样不用同时改好几份状态。

勾选变化以后，我会把选中的 basketId 发给服务端，用它返回的总价、优惠和应付金额。这里还加了请求编号，因为用户连续勾选时，前一个请求可能反而晚回来，不能让它把新金额覆盖掉。

改数量和删除都是接口成功后才更新页面。删完没有商品的店铺也会一起移除。点结算时，把已选 basketId 放到 sessionStorage，确认页再去请求完整的确认信息。

【金额交给服务端算，主要是商品价格和优惠可能变化，前端直接相加不一定准确。改数量用到了 Stepper 的 `before-change`，传新旧数量的差值，失败就保留原来的数量，同一件商品请求中也不能重复修改。】

## 回答要点

- 购物车接口的数据分了店铺、优惠分组和商品几层。
- 勾选变化以后，我会把选中的 basketId 发给服务端，用它返回的总价、优惠和应付金额。
- 改数量和删除都是接口成功后才更新页面。删完没有商品的店铺也会一起移除。

## 面试官可能追问

- 修改数量没有改变已选 ID，为什么还要重新计价？
- 计价失败以后结算按钮应该处于什么状态？

## 代码证据

> **代码依据（不用于口述）**
> - [购物车第 227～252 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:227)：全部商品、选中 ID、页面全选、金额单位转换和计价监听。
> - [购物车第 261～307 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:261)：按店铺合并优惠分组中的商品并加载列表。
> - [购物车第 341～352 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:341)：店铺全选、半选和批量切换。
> - [购物车第 364～396 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:364)：服务端计价、请求编号和旧结果失效。
> - [购物车第 99～109、399～427 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:99)：异步步进器、数量差值、按商品防重复和失败回退。
> - [购物车第 430～475 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:430)：单项删除和清空购物车。
> - [购物车第 481～496 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:481)：把结算参数写入 sessionStorage 并跳转确认页。
