---
id: shiguang-followup-checkout-storage
title: 追问：确认订单为什么使用 sessionStorage，不用 localStorage 或 Pinia？刷新和换账号怎么办？
aliases: [能讲讲项目中的确认订单使用 sessionStorage 的取舍吗？, 关于确认订单使用 sessionStorage 的取舍，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, sessionStorage, 订单参数, 用户归属]
---

# 追问：确认订单为什么使用 sessionStorage，不用 localStorage 或 Pinia？刷新和换账号怎么办？

## 核心回答

结算参数要在跳页和刷新后保留，但只给当前标签页这次下单用，所以选择 sessionStorage，不长期留在 localStorage。购物车存 basketId，立即购买存商品、SKU、数量和店铺，确认页再向后端拿真实商品、地址和金额。

Pinia 更适合共享响应式状态，默认刷新也会丢；可以再配持久化，但这个项目的订单目前没有用 Pinia 管。换账号还有个问题：退出没有清理结算参数，我会补用户归属、结构和有效期检查，在退出或订单完成后清掉。

【本地参数可能被修改或损坏，不能当成可信订单。也可以用 Pinia 管状态、sessionStorage 保留必要字段；要跨设备恢复草稿，就需要服务端保存。】

## 回答要点

- 结算参数要在跳页和刷新后保留，但只给当前标签页这次下单用，所以选择 sessionStorage，不长期留在 localStorage。
- Pinia 更适合共享响应式状态，默认刷新也会丢；可以再配持久化，但这个项目的订单目前没有用 Pinia 管。
- 本地参数可能被修改或损坏，不能当成可信订单。

## 面试官可能追问

- 换账号后还保留上一位用户的结算参数会有什么风险？
- 本地参数损坏或过期时确认页应该如何处理？

## 代码证据

> **代码依据（不用于口述）**
> - [购物车第 481～496 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:481)：写入 basketId 结算参数。
> - [商品详情第 450～464 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:450)：立即购买参数写入。
> - [确认订单第 120～158 行](/Users/aaron/personal-hub/apps/project-2/src/views/Order.vue:120)：读取本地参数并向服务端重新确认。
> - [对比状态 store](/Users/aaron/personal-hub/apps/project-2/src/stores/compare.ts:9)：新增对比功能用 Pinia 管共享选择，订单结算参数仍采用 sessionStorage。
> - 原理参考：[MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)。
