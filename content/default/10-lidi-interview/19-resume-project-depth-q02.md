---
id: lidi-202609-resume-project-depth-q02
title: 如果让你讲一个没有写在项目介绍里的细节，你会讲什么？
aliases: []
category: current-interview
difficulty: 简历追问
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [熟练, GitHub, 技术深度, 项目真实性, 个人网站]
---

# 如果让你讲一个没有写在项目介绍里的细节，你会讲什么？

## 核心回答

1. 我会讲轻购AI推荐结果里的 `matched`、`unmatched` 和 `relaxedConstraints`。用户说“800 元以内、续航好、降噪”，系统不一定能同时找到所有条件，所以页面把已匹配的条件展示出来，把没有明确证据的条件单独提示，而不是假装每个条件都满足。
2. 这个细节体现的是我对 AI 输出边界的理解：推荐结果应该让用户知道依据和不确定性，不能只给一个看起来很聪明的商品列表。
3. 如果问代码细节，我可以从 `GuideView.vue` 讲到 `getGuideRecommendations`、`GuideResult` 类型和商品详情跳转；但意图解析和推荐算法是在 `/guide/recommend` 后端完成的，我不会把那部分说成自己写的。
4. 如果接口失败，当前前端会提示失败，不会拿空数据继续渲染。后续还可以补更完整的前端结构校验和重试，这也是项目可以改进的地方。
