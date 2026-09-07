---
id: lidi-202609-search-debounce-ai
title: 轻购的搜索防抖和 AI 搜索建议是怎么实现的？
aliases: [搜索防抖, 300 毫秒防抖, AI 搜索联想, 搜索结果异常]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [防抖, AI, 搜索, 异常降级, 结果乱序, 输入联想]
---

# 轻购的搜索防抖和 AI 搜索建议是怎么实现的？

## 核心回答

1. 轻购的搜索页有普通商品搜索、热搜、搜索历史和 AI 搜索联想。用户真正按下搜索时调用 `/search/searchProdPage`，输入过程中显示的是联想建议，不会替代普通搜索。
2. AI 联想用 300 毫秒防抖，输入变化时先清理定时器和旧的 `AbortController`，用户停下来以后再调用 `getSearchSuggestions`。
3. AI 返回内容会按换行或逗号拆开，去掉编号和多余符号，限制每条最多 10 个字，并且只接受正好 5 条建议；格式不符合时改用本地规则。
4. 为了避免旧请求覆盖新输入，代码同时用了取消请求和递增的 `suggestionRequestId`。即使某个请求来不及取消，返回时发现编号不是当前编号，也不会更新页面。
5. 这条链路的重点是 AI 失败不能影响普通搜索。AI 超时、报错或格式不对时，用户仍然可以用本地联想或直接搜索关键词。
