---
id: lidi-202609-product-sku-selection
title: 轻购商品详情里的 SKU 选择是怎么实现的？
aliases: [SKU选择, 商品规格, ActionPanel, sku properties]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [SKU, ActionPanel, propertyMap, selectedProps, skuId]
---

# 轻购商品详情里的 SKU 选择是怎么实现的？

## 核心回答

1. 商品详情加载后把 `product.skuList` 保存到 `skuList`，默认选中第一条 SKU，并把它传给 `ActionPanel`。
2. `ActionPanel` 会遍历每个 SKU 的 `properties` 字符串，例如按分号拆成多个属性，再按冒号分成属性名和值，整理出颜色、尺寸等可选项。
3. 用户点击某个属性以后，`selectedProps` 更新，再把当前选择重新拼成属性字符串，去 `skuList` 里找完全匹配的 SKU。
4. 找到以后通过 `confirm` 事件把 SKU 传回详情页，详情页更新 `selectedSku` 并关闭规格面板。加入购物车和立即购买都使用当前选中的 `skuId`。
5. 当前实现假设属性顺序和后端返回的字符串一致，所以用完整字符串匹配。更稳妥的方式是把属性解析成排序后的键值对象再比较，或者直接依赖后端提供的规格组合 ID。
6. 如果某些规格组合不存在，页面还应该禁用不可选组合，而不是让用户选完以后才发现没有匹配 SKU，这是后续可以增强的地方。

