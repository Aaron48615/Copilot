---
id: shiguang-normal-ai-suggestions
title: AI 搜索联想和商品卖点
aliases: [能讲讲项目中的AI 搜索联想和商品卖点的实现吗？, 关于AI 搜索联想和商品卖点的实现，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [AI 联想, 规则兜底, 服务端密钥]
---

# AI 搜索联想和商品卖点

## 核心回答

我先做的是搜索联想和商品卖点。搜索框输入后停一会儿，会给一些相关建议；详情页则根据商品名称、价格和简介生成几条卖点，方便用户快速看一下。

这两个功能都留了本地兜底。比如模型没配置、超时，或者返回了空内容，搜索就先匹配本地品类词表，没匹配上再根据关键词给通用建议；卖点也是先按品类匹配，再补通用文案。这样 AI 出问题，不会把正常的搜索和购物流程卡住。

【搜索的通用建议像“推荐、新品、热卖、优惠”，卖点规则里有鞋、运动、手机和数码等类别。这里没有结合用户画像，所以我不会把它说成个性化推荐。】

现在共享 Key 放在服务端，前端调用本站的 `/api/ai`。

【练习版之前是在浏览器里读 Key，再直接请求模型。后来迁到服务端，补了请求方法、JSON、请求体大小、提示词长度和模型检查，也处理了限流、超时和错误。不过限流还是单个实例内的计数，没有按用户分配额度。】

## 回答要点

- 我先做的是搜索联想和商品卖点。搜索框输入后停一会儿，会给一些相关建议；详情页则根据商品名称、价格和简介生成几条卖点，方便用户快速看一下。
- 这两个功能都留了本地兜底。比如模型没配置、超时，或者返回了空内容，搜索就先匹配本地品类词表，没匹配上再根据关键词给通用建议；卖点也是先按品类匹配，再补通用文案。
- 搜索的通用建议像“推荐、新品、热卖、优惠”，卖点规则里有鞋、运动、手机和数码等类别。

## 面试官可能追问

- 模型返回的卖点没有商品依据时应该怎么办？
- 单实例 IP 限流为什么不能代表全站额度控制？

## 代码证据

> **代码依据（不用于口述）**
> - [搜索联想第 20～40 行](/Users/aaron/personal-hub/apps/project-2/src/ai/search.js:20)：搜索提示词和通用回退建议。
> - [卖点生成第 43～75 行](/Users/aaron/personal-hub/apps/project-2/src/ai/search.js:43)：商品信息输入、提示词和品类回退。
> - [详情页第 325～372 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:325)：商品主体先展示，再加载辅助数据和 AI 卖点。
> - [部署版 AI 客户端第 7～46 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)：请求本站 `/api/ai`、错误映射和 15 秒超时。
> - [AI 服务端第 21～43 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:21)：请求体实际读取过程的 16 KiB 限制。
> - [AI 服务端第 46～72 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:46)：单实例中的分钟和小时滑动窗口限流。
> - [AI 服务端第 76～147 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:76)：请求来源、类型、提示词、模型和服务端 Key 检查。
> - [AI 服务端第 167～226 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:167)：调用模型、输出限制、12 秒超时和错误收敛。
> - [练习版 AI 配置第 13～38 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:13)：浏览器读取 localStorage 或 `VITE_AI_*` 配置。
