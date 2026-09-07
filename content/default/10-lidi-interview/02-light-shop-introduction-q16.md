---
id: lidi-202609-light-shop-ai-selling-points
title: 商品详情页的 AI 卖点是怎么做的？
aliases: [AI卖点, 商品文案, 商品详情AI]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [productSellingPoints, 商品名称, 商品价格, 商品简介, fallback]
---

# 商品详情页的 AI 卖点是怎么做的？

## 核心回答

1. 商品详情基础信息加载成功以后，`ProductDetailView` 调用 `getProductSellingPoints(product.value)`，把商品名称、价格和简介传给 AI 逻辑。
2. `productSellingPoints.ts` 里会组织提示词，要求生成四条不同角度的卖点，每条控制长度并直接按行返回。前端拿到内容以后按换行拆分。
3. 如果 AI 调用成功，页面标记来源为 AI；如果请求失败，就根据商品名称判断手机、数码、鞋、跑步等类别，或者使用通用卖点，保证详情页还有内容。
4. 这个功能只负责文案增强，不能改变商品价格、库存、SKU 或评论数据。商品事实仍然来自商品详情接口。
5. 当前卖点解析还比较轻量，后续可以加条数、长度、重复内容和敏感词校验；如果解析失败就使用本地卖点，而不是把一整段异常文本直接显示出来。

