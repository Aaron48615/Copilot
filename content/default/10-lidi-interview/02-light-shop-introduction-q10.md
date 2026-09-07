---
id: lidi-202609-light-shop-ai-failure
title: 轻购AI接口超时或失败时，页面怎么处理？
aliases: [AI超时, AI接口失败, 轻购AI降级]
category: current-interview
difficulty: 必问
priority: high
projects: [轻购]
keywords: [AI失败, timeout, Toast, loading, fallback]
---

# 轻购AI接口超时或失败时，页面怎么处理？

## 核心回答

1. 轻购AI页面提交时先进入 loading 状态，并把上一次结果清掉。请求成功以后展示新结果，请求失败就进入 catch。
2. catch 里会把错误转成用户能理解的提示。如果是后端返回的错误，就使用 `response.msg`；如果是网络或其他异常，就提示“轻购AI暂时开小差了”。
3. finally 一定会把 loading 设回 false，避免接口失败以后按钮一直显示“正在挑选”。
4. 当前轻购AI页面的降级方式是提示失败，用户可以重新提交；搜索联想那条链路则有更明确的本地规则 fallback。两者不能混着说。
5. 如果继续完善，我会给轻购AI加超时控制、重试按钮、空推荐结果的专门提示和服务端规则兜底。比如模型不可用时，服务端仍然可以根据预算和分类返回普通推荐。
6. 无论是否降级，基础商品搜索和分类浏览都应该可用，不能让一个 AI 页面故障影响整个商城。
