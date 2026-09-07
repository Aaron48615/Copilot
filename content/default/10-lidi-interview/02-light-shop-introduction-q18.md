---
id: lidi-202609-product-detail-parallel
title: 商品详情页为什么把三个请求放进 Promise.all？
aliases: [商品详情并发请求, Promise.all, 收藏评论详情]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [ProductDetailView, Promise.all, 商品详情, 收藏, 评论]
---

# 商品详情页为什么把三个请求放进 Promise.all？

## 核心回答

1. 商品详情页进入时，需要商品信息、收藏状态和评论统计。它们都只依赖同一个 `prodId`，彼此之间没有先后关系。
2. 所以代码用 `Promise.all([getProductDetail, getCollectionStatus, getProductCommentData])` 同时发起请求，整体等待时间接近最慢的一个请求，而不是三个请求时间相加。
3. 三个请求都成功以后，再分别把商品、图片、SKU、收藏状态和评论数据写入对应的 ref。商品的 `imgs` 字符串会按逗号拆成图片数组。
4. `Promise.all` 的特点是其中一个请求 reject 时整体进入 catch。对当前页面来说，如果商品详情都没拿到，就没有必要继续展示完整页面；后续可以根据业务把评论或收藏失败改成局部降级。
5. 商品基础信息完成后，代码再请求 AI 卖点，因为卖点提示词需要商品名称、价格和简介。AI 卖点不是详情主请求的一部分，失败也不应该阻塞商品本身显示。

