---
id: lidi-202609-light-shop-ai-explain
title: 为什么轻购AI要展示 matched、unmatched 和 relaxedConstraints？
aliases: [AI可解释性, 推荐理由, 匹配条件, 放宽条件]
category: current-interview
difficulty: 必问
priority: high
projects: [轻购]
keywords: [matched, unmatched, relaxedConstraints, evidence, 可解释性]
---

# 为什么轻购AI要展示 matched、unmatched 和 relaxedConstraints？

## 核心回答

1. 如果页面只显示“AI 推荐了这三件商品”，用户不知道为什么推荐，也不知道它有没有真的满足自己的预算和偏好，信任感会比较弱。
2. `matched` 用来显示商品和用户需求相符的条件，比如“价格在预算内”或“商品描述里提到了降噪”。页面最多展示前三条，避免卡片过长。
3. `unmatched` 不是直接说商品一定不满足，而是说明当前商品数据里没有找到明确说明。页面用“暂未找到明确说明”提示，避免把“没有证据”说成“肯定不满足”。
4. `relaxedConstraints` 用来说明推荐系统为了找到商品放宽了哪些限制。它让用户知道结果不是严格满足所有条件，而是经过了取舍。
5. 返回类型里还有 `evidence`，包含需求和来源。当前前端没有把证据全部展开，但这个字段为以后展示“依据来自商品简介还是属性”留下了空间。
6. 我觉得这比单纯把 AI 文案写得很像人更重要：电商推荐要让用户知道结果的依据和不确定性。

