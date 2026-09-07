---
id: lidi-202609-light-shop-ai-overview
title: 轻购AI具体是什么功能？
aliases: [轻购AI, AI选购, 智能导购, 自然语言购物]
category: current-interview
difficulty: 必问
priority: high
projects: [轻购]
keywords: [轻购AI, AI导购, 自然语言, 推荐商品, guide]
---

# 轻购AI具体是什么功能？

## 核心回答

1. 轻购AI是一个独立的智能导购页面。用户不用先想好准确的商品关键词，可以直接说“800 元以内，想买通勤用的降噪耳机，续航要好”这种需求。
2. 首页右下角的 `GuideFab` 可以打开 `/guide`，页面里有输入框、示例问题和“帮我挑选”按钮。输入至少需要有两个字符，避免空请求。
3. 提交以后，前端调用 `getGuideRecommendations`，也就是向 `/guide/recommend` 发送 `{ query }`。接口返回的不是一段普通文本，而是 `GuideResult` 结构。
4. `GuideResult` 里有需求意图、预算、要求、排除条件、推荐商品和每个商品的匹配信息。页面会显示匹配到了哪些条件，没有明确找到哪些条件，以及是否放宽了某些限制。
5. 用户点击推荐卡片以后，前端只把商品 ID 带到商品详情页，后续仍然可以看图片、SKU、价格、评论和 AI 卖点。
6. 我能负责和讲清楚的是前端调用、类型、状态和展示。自然语言解析、商品筛选和推荐排序由 `/guide/recommend` 服务端提供，我不会把后端模型算法说成自己写的。

