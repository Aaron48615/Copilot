---
id: lidi-202609-search-ai-parse
title: 搜索联想拿到 AI 文本后为什么还要解析？
aliases: [AI文本解析, 五条建议, 返回格式校验]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [parseSuggestions, 换行, 逗号, 五条, 十个字]
---

# 搜索联想拿到 AI 文本后为什么还要解析？

## 核心回答

1. 提示词要求模型每行返回一条，但模型仍然可能加编号、短横线、解释文字，或者用逗号把多条内容放在一行，所以前端不能把整段文本直接当成五个标签。
2. `parseSuggestions` 会按换行或中英文逗号切分，去掉开头的编号、短横线和圆点，再 trim 空白。
3. 每条建议最多保留十个字符，最后只取前五条。`getSearchSuggestions` 还要求解析后正好有五条，少于或多于预期都使用本地 fallback。
4. 这样做是为了保护页面展示，不代表前端能判断 AI 语义一定正确。比如它返回五条语法正确但完全不相关的词，仍然需要服务端或后续反馈来优化。
5. 如果继续完善，我会增加重复建议过滤、敏感词过滤和与原关键词的相关性检查，并给异常结果记录原因。

