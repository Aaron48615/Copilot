---
id: lidi-202609-light-shop-ai-flow
title: 轻购AI从输入到展示结果的完整流程是什么？
aliases: [AI导购流程, GuideView流程, AI推荐链路]
category: current-interview
difficulty: 必问
priority: high
projects: [轻购]
keywords: [GuideView, guide/recommend, GuideResult, loading, recommendations]
---

# 轻购AI从输入到展示结果的完整流程是什么？

## 核心回答

1. 用户在 `GuideView.vue` 的 textarea 输入需求，点击按钮或者按回车提交。提交函数先 trim 文本，长度小于 2 时直接提示，不发请求。
2. 开始请求前把 `loading` 设为 true，并把上一次结果清掉。页面会显示“正在为你挑选”的加载状态，让用户知道请求还没有结束。
3. `getGuideRecommendations` 通过项目的 Axios 请求函数向 `/guide/recommend` 发送 query。请求成功以后，先判断 `response.success`，失败就抛出错误进入页面的 Toast 提示。
4. 成功结果放进 `result`。页面先展示 `relaxedConstraints`，再遍历 `recommendations`，每个推荐卡片显示商品图片、名称、价格、匹配条件和没有明确证据的条件。
5. 用户点击商品卡片或“查看商品”，通过 `prodId` 跳到 `/product-detail`。推荐页不自己重复加载商品详情，详情页再按自己的接口加载完整数据。
6. 请求结束以后，无论成功还是失败都会把 `loading` 设回 false。这样页面不会因为异常一直处在加载状态。

