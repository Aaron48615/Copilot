---
id: shiguang-followup-skeleton-wrapper
title: 追问：Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么？
aliases: [能讲讲项目中的SkeletonList 的封装价值和效果吗？, 关于SkeletonList 的封装价值和效果，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, SkeletonList, Vant, 加载占位]
---

# 追问：Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么？

## 核心回答

SkeletonList 里面还是 Vant Skeleton，我只是把搜索、购物车、订单和地址里重复的列表占位结构封装了一层。数量、文字行数、头像大小和形状、间距都能传参数，页面再用自己的 loading 控制显示。

这样少写重复模板，列表的加载效果也比较一致。骨架屏主要是告诉用户正在加载，占位接近真实内容时也能减少跳动，不会改变接口速度。

【首页是轮播加商品网格，结构不同，所以保留专用骨架。具体体验有没有改善，需要看实际加载过程，不能只因为用了骨架屏就报性能提升比例。】

## 回答要点

- SkeletonList 里面还是 Vant Skeleton，我只是把搜索、购物车、订单和地址里重复的列表占位结构封装了一层。
- 这样少写重复模板，列表的加载效果也比较一致。
- 首页是轮播加商品网格，结构不同，所以保留专用骨架。

## 面试官可能追问

- 首页为什么保留专用骨架而不直接用列表骨架？
- 怎样区分加载体验改善和接口速度提升？

## 代码证据

> **代码依据（不用于口述）**
> - [SkeletonList 第 1～46 行](/Users/aaron/personal-hub/apps/project-2/src/components/SkeletonList.vue:1)：Vant Skeleton、组件参数、默认值和样式变量。
> - [搜索第 33～37 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:33)、[购物车第 32～38 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:32)、[订单列表第 15～22 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:15)、[地址第 19～24 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:19)：四个公共骨架入口。
> - [首页第 10～22、49～106 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:10)：首页专用骨架和内容布局。
> - [首页第 31～38、136～143 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:31)：首张轮播优先级和商品图懒加载；这些是其他资源策略。
