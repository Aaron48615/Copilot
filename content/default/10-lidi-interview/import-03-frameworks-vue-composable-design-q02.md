---
id: lidi-202609-import-03-frameworks-vue-composable-design-q02
title: 搜索 composable 要处理什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [composable, Composition API, use, 逻辑复用]
---

# 搜索 composable 要处理什么？

## 核心回答

关键词、loading、结果、错误、请求取消、旧结果保护和清空行为都要定义。组件卸载时取消请求；空关键词时不要发无意义请求；调用方还应该能决定是否自动请求。

