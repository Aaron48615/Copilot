---
id: lidi-202609-search-history-hot
title: 轻购搜索历史和热门搜索是怎么做的？
aliases: [搜索历史, 热搜, localStorage搜索]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [search-history, localStorage, hotSearch, 搜索记录]
---

# 轻购搜索历史和热门搜索是怎么做的？

## 核心回答

1. 搜索历史用 `localStorage` 保存，键名是 `search-history`。页面挂载时读取，读取成功后放到 `history` 里展示。
2. 用户真正搜索成功以后才保存关键词，不是用户每输入一个字就写历史。保存前先把相同关键词过滤掉，再把新关键词放到最前面，最多保留十条。
3. 点击历史标签会复用 `doSearch`，删除历史只从数组和 localStorage 里移除，清空历史则写入空数组。
4. 热门搜索通过 `/search/hotSearch` 获取，接口没有数据或请求失败时使用 iPhone、运动鞋、兰蔻等本地备用词。
5. 当 AI 联想正在加载，或者已经有 AI 建议时，页面会隐藏热搜，避免同一块区域同时出现两套建议。
6. 这些数据只是当前浏览器的搜索体验，不涉及用户订单等敏感数据；如果是正式产品，还要考虑账号维度同步和隐私清理入口。

