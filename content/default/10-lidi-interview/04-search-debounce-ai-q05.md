---
id: lidi-202609-search-empty-error
title: 轻购搜索输入为空、接口失败或没有结果时怎么办？
aliases: [搜索空结果, 搜索失败, 搜索边界]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [搜索校验, empty, error, searchProdPage]
---

# 轻购搜索输入为空、接口失败或没有结果时怎么办？

## 核心回答

1. `doSearch` 开始时会对关键词 `trim`，空字符串直接返回，不调用商品搜索接口，也不会保存空历史。
2. 正常搜索时先把 `loading` 和 `hasSearched` 设置好，并停止正在进行的 AI 联想。这样用户按下搜索以后，页面展示的是商品搜索状态，不会让旧的 AI 建议继续干扰。
3. 请求成功以后读取 `res.data.records`，没有记录时显示“暂无搜索结果”；这和请求失败不一样，空结果说明请求成功但没有匹配商品。
4. 请求失败时把商品列表清空，页面仍然结束 loading。当前代码主要通过控制台记录失败，后续可以补更明确的用户提示和重试按钮。
5. 点击清空或取消会把关键词、结果、loading、hasSearched 和 AI 建议一起重置，避免页面还保留上一次搜索的状态。

