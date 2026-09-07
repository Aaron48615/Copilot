---
id: lidi-202609-light-shop-ai-types
title: 轻购AI返回结果为什么要用 TypeScript 类型？
aliases: [GuideResult, AI返回类型, AI接口类型]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [TypeScript, GuideResult, GuideRecommendation, 类型安全]
---

# 轻购AI返回结果为什么要用 TypeScript 类型？

## 核心回答

1. 轻购AI返回的数据不是一个简单字符串，而是有多层结构：意图、推荐数组、商品对象、匹配条件、未匹配条件、证据和放宽条件。如果全靠 `any`，字段名写错时很难提前发现。
2. 项目用 `GuideProduct` 描述商品，用 `GuideRecommendation` 描述一条推荐，用 `GuideResult` 描述整个接口结果。这样 `GuideView.vue` 访问 `result.recommendations` 或 `item.product.prodId` 时有明确提示。
3. 类型主要解决开发阶段的约束，不会自动验证服务器真的返回了正确数据。服务器可能漏字段、返回 null 或返回错误类型，所以还需要运行时校验。
4. 目前项目已经有类型定义，但前端还没有完整的 schema 校验。继续改进时可以在 API 边界检查数组、商品 ID、价格和匹配字段，不符合时显示错误或安全空状态。
5. 这样做的好处是把“接口约定”和“页面使用方式”写清楚，后端字段变化时，编译器也能提醒受影响的位置。

