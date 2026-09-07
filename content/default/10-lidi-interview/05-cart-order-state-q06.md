---
id: lidi-202609-cart-session-order
title: 为什么用 sessionStorage 传购物车到订单确认页？
aliases: [confirmOrder, sessionStorage下单, 跨页面传参]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [sessionStorage, confirmOrder, basketIds, orderItem, URL参数]
---

# 为什么用 sessionStorage 传购物车到订单确认页？

## 核心回答

1. 购物车提交时需要传多个选中的 `basketIds` 和地址 ID；立即购买还需要传商品 ID、SKU ID、数量和店铺 ID。全部放进 URL query 会很长，也会把业务数据暴露在地址栏里。
2. 所以项目把这次下单的临时对象序列化后写入 `sessionStorage` 的 `confirmOrder`，再跳到 `/order-confirm`。
3. `sessionStorage` 只在当前浏览器标签页的会话中保留，适合这次页面跳转使用；它不是长期订单数据，也不是后端事实来源。
4. 订单确认页进入时先读取并 `JSON.parse`。如果没有这份数据，就提示用户重新选择商品并回到购物车。
5. 读取后会重新请求地址和订单确认金额；订单提交成功后删除 `confirmOrder`，避免用户刷新页面重复使用旧的下单参数。
6. 更复杂的项目也可以用 Pinia 或后端草稿订单，但无论用哪种方式，金额、库存和订单状态都必须在服务端重新确认。

