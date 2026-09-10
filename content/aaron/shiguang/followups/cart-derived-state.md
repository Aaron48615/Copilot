---
id: shiguang-followup-cart-derived-state
title: 追问：购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么？
aliases: [能讲讲项目中的购物车派生状态与 computed、watch 分工吗？, 关于购物车派生状态与 computed、watch 分工，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, computed, watch, 全选半选]
---

# 追问：购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么？

## 核心回答

全选和半选都能从商品的 checked 算出来，所以我不另外存几个布尔值。已选 ID、店铺全选和页面全选都跟着商品状态走，单选变化后也不会忘记同步。

computed 负责这些计算，全选还写了 setter，点击时批量修改商品。watch 监听已选 ID，变化后请求服务端计价；修改数量不会改变 ID，所以数量接口成功后还会主动重新计价。

【页面全选还要先判断购物车不是空的，因为空数组调用 `every` 也会返回 true。】

## 回答要点

- 全选和半选都能从商品的 checked 算出来，所以我不另外存几个布尔值。
- computed 负责这些计算，全选还写了 setter，点击时批量修改商品。
- 页面全选还要先判断购物车不是空的，因为空数组调用 `every` 也会返回 true。

## 面试官可能追问

- 空购物车调用 every 为什么可能导致全选判断错误？
- 改数量后已选 ID 不变，计价由什么触发？

## 代码证据

> **代码依据（不用于口述）**
> - [购物车第 227～252 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:227)：商品扁平化、已选 ID、全选、金额和 watch。
> - [购物车第 341～352 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:341)：店铺全选、半选和批量修改。
> - [购物车第 418～427 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:418)：数量成功后主动重新计价。
