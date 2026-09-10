---
id: shiguang-normal-product-sku
title: 商品详情和 SKU
aliases: [能讲讲项目中的商品详情与 SKU 选择吗？, 关于商品详情与 SKU 选择，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [SKU, 属性匹配, 库存]
---

# 商品详情和 SKU

## 核心回答

详情页会先拿图片、价格、商品介绍和 SKU 这些主要数据，拿到后就先把商品展示出来。收藏状态和评价统计再并行请求，AI 卖点也单独加载，不用等这些辅助内容全部回来才让用户看到商品。

SKU 属性原来是“颜色:黑色;尺码:M”这样的字符串，我会拆成属性和属性值，再用 Set 整理各个选项。现在匹配时是按键值对逐项比较，不再拼回字符串直接判断，所以属性顺序换了也能匹配到同一个 SKU。用户选到不存在或者没库存的组合时，会清掉当前 SKU 并提示。

【从对比页过来，会先检查带来的 skuId 是否在当前商品里、有没有库存，有效才预选，否则找第一个有库存的规格。加购和立即购买之前，也会检查商品 ID、店铺 ID 和 skuId 是否准备好了。】

## 回答要点

- 详情页会先拿图片、价格、商品介绍和 SKU 这些主要数据，拿到后就先把商品展示出来。
- SKU 属性原来是“颜色:黑色;尺码:M”这样的字符串，我会拆成属性和属性值，再用 Set 整理各个选项。
- 从对比页过来，会先检查带来的 skuId 是否在当前商品里、有没有库存，有效才预选，否则找第一个有库存的规格。

## 面试官可能追问

- 属性顺序变化为什么不应该影响 SKU 匹配？
- 从对比页带来的 skuId 已经缺货时怎样处理？

## 代码证据

> **代码依据（不用于口述）**
> - [商品详情第 325～372 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:325)：主体、收藏评价和 AI 的加载顺序。
> - [商品详情第 385～417 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:385)：拆分属性、Set 去重、默认选择和组合匹配。
> - [SkuTags 第 1～25 行](/Users/aaron/personal-hub/apps/project-2/src/components/SkuTags.vue:1)：规格标签展示和选择事件。
> - [商品详情第 196～230 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:196)：加购和立即购买弹层使用 SKU 标签。
> - [商品详情第 422～464 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:422)：ID 检查、加购参数和立即购买参数。
