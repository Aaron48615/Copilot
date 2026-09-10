---
id: shiguang-followup-quantity-before-change
title: 追问：修改数量为什么使用 before-change？为什么传新旧差值，不直接传目标数量？
aliases: [能讲讲项目中的before-change 与数量增量提交吗？, 关于before-change 与数量增量提交，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, before-change, 数量增量, 请求锁]
---

# 追问：修改数量为什么使用 before-change？为什么传新旧差值，不直接传目标数量？

## 核心回答

用 before-change 是想先等接口成功，再让步进器显示新数量。现在传的是新旧差值，比如 2 改成 5 就传 3，成功返回 true，失败返回 false，保留原数量。同一件商品修改中，会把 basketId 放进 Set，防止重复操作。

【这是比较好控制的做法，但网络慢时要等一下。也可以先改界面再请求，失败回滚，不过连续操作更难处理。当前按增量传参，假如后端执行的是“加 3”，自动重试可能再加一次，所以后端没保证重复请求只生效一次之前，不能盲目重试。结果不确定时，可以重新查购物车确认数量。】

## 回答要点

- 用 before-change 是想先等接口成功，再让步进器显示新数量。
- 这是比较好控制的做法，但网络慢时要等一下。也可以先改界面再请求，失败回滚，不过连续操作更难处理。

## 面试官可能追问

- 增量请求超时后为什么不能盲目自动重试？
- 先改页面失败再回滚，与等待成功各有什么代价？

## 代码证据

> **代码依据（不用于口述）**
> - [步进器第 99～109 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:99)：before-change、数量范围和更新中禁用。
> - [购物车第 399～427 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:399)：差值计算、按商品防重复、成功允许和失败拒绝。
