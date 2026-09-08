---
id: lidi-202609-light-shop-ai-frontend-or-backend
title: AI 是由前端调用，还是由后端调用？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [轻购AI, 前端, 后端, guide/recommend, ai/chat, GLM]
---

# AI 是由前端调用，还是由后端调用？

轻购这边，页面不会直接去调模型厂商，真正调 AI 的是后端。

项目里其实有三处 AI。轻购AI是独立导购页，用户输入一段需求，比如“800 块以内通勤用的降噪耳机”，前端把这段 query 发给自己的接口 `/guide/recommend`。后面解析需求、查商品库、调模型，都是后端做的，前端拿到的是商品列表、匹配条件、还有哪些条件没对上。搜索联想和商品卖点也是前端先打自己的 `/ai/chat`，再由后端去调 GLM 兼容接口。

前端负责发请求、做加载和失败处理、把结果展示出来；模型调用和商品筛选在后端。我没有自己训练模型，用的是现成能力和项目提供的接口。接好接口，不等于我写了推荐算法。
