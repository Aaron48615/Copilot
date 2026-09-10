---
id: shiguang-normal-home-loading
title: 首页数据加载和骨架屏
aliases: [能讲讲项目中的首页数据加载与骨架屏吗？, 关于首页数据加载与骨架屏，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [Promise.allSettled, 骨架屏, 失败隔离]
---

# 首页数据加载和骨架屏

## 核心回答

首页有轮播图、公告和推荐商品，三块数据互相不依赖，我就把请求一起发出去，用 `Promise.allSettled` 拿到各自的结果。回来后除了看请求有没有报错，还会看业务的 `success` 和数据是不是数组。这样公告没加载出来，轮播和商品也还能正常显示，页面会单独提示失败的部分。

等数据的时候，首页会显示和轮播、商品网格对应的骨架屏。搜索、购物车、订单、地址这些列表则共用一个 `SkeletonList`，数量、文字行数和头像大小可以传参数调整。

【现在是等三个请求都结束后再更新，还没有做到哪块先回来就先显示哪块。骨架屏主要是让用户知道正在加载，也减少页面突然跳动，并不会让接口本身变快。`allSettled` 的好处是方便逐项处理结果，而不是遇到一个拒绝就直接走整体的失败分支。】

## 回答要点

- 首页有轮播图、公告和推荐商品，三块数据互相不依赖，我就把请求一起发出去，用 `Promise.allSettled` 拿到各自的结果。
- 等数据的时候，首页会显示和轮播、商品网格对应的骨架屏。
- 现在是等三个请求都结束后再更新，还没有做到哪块先回来就先显示哪块。

## 面试官可能追问

- 如果一个请求一直很慢，其他模块什么时候显示？
- 怎样区分正常空数据和加载失败？

## 代码证据

> **代码依据（不用于口述）**
> - [homeData.ts 第 13～41 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:13)：三组请求并行结算、业务状态和数据结构检查。
> - [首页第 5～8 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:5)：失败区域提示和重试入口。
> - [首页第 10～22、49～106 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:10)：首页专用骨架和内容切换。
> - [首页第 185～205 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:185)：实际调用加载器、分别赋值和结束 loading。
> - [SkeletonList 第 17～46 行](/Users/aaron/personal-hub/apps/project-2/src/components/SkeletonList.vue:17)：公共列表骨架的参数和样式变量。
> - [搜索第 33～37 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:33)、[购物车第 32～38 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:32)、[订单列表第 15～22 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:15)、[地址第 19～24 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:19)：公共骨架的实际使用位置。
