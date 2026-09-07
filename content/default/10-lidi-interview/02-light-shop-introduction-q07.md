---
id: lidi-202609-light-shop-ai-intent
title: 轻购AI怎么处理预算、用途和用户偏好？
aliases: [AI意图识别, 预算解析, 需求解析]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [intent, budgetMax, requirements, exclusions, AI解析]
---

# 轻购AI怎么处理预算、用途和用户偏好？

## 核心回答

1. 前端不直接解析“800 元以内”或“适合通勤”这些自然语言，它把完整 query 传给 `/guide/recommend`。这样解析规则和商品数据放在服务端，前端只负责展示结果。
2. 返回的 `intent` 里有 `category`、`budgetMax`、`requirements` 和 `exclusions`。比如预算可能变成一个数字上限，降噪、续航、通勤可能变成需求列表。
3. 推荐结果里的 `matched` 说明商品命中了哪些条件，`unmatched` 说明商品信息里没有找到明确证据的条件。它们不是简单的“满足”和“不满足”，而是让用户知道哪些信息有依据。
4. 如果严格条件下找不到足够商品，接口可以返回 `relaxedConstraints`，页面把放宽条件提示给用户。比如预算范围或某个偏好被适当放宽，用户可以自己决定是否接受。
5. 这样做比前端只拿一个商品列表更容易解释，也能把“推荐为什么是它”和“哪些条件还不确定”交代清楚。
6. 面试时我会强调：我负责前端数据结构和展示，真正的自然语言解析和筛选逻辑要以服务端实现为准，不会凭空说后端是怎么做的。

