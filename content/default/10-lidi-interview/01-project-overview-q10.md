---
id: lidi-202609-home-parallel-loading
title: 轻购首页为什么用 Promise.all 加载多个接口？
aliases: [首页并行请求, banner notice productGroups, Promise.all]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [HomeView, Promise.all, 轮播图, 公告, 商品分组]
---

# 轻购首页为什么用 Promise.all 加载多个接口？

## 核心回答

1. 首页需要轮播图、公告和商品分组，三个接口都只依赖首页本身，不需要前一个结果作为后一个的参数，所以可以并行请求。
2. `initHome` 用 `Promise.all` 同时调用 `getBannerList`、`getNoticeList` 和 `getProductGroups`，等三个结果一起回来后分别写进三个 ref。
3. 这样比先请求轮播图、再请求公告、最后请求商品更快，整体等待时间接近最慢的接口。
4. 首页用一个 loading 控制骨架屏，finally 里把它关掉。当前任意一个请求抛错都会进入 catch，页面至少结束 loading；后续可以把三个区域拆成局部 loading，让一个接口失败不影响另外两个区域。
5. 商品卡片和轮播图点击时只传商品 ID 进入详情；首页分组点击分类时通过 `sessionStorage` 记下来自首页的分类，再进入分类页。

