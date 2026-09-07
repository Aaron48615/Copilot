---
id: lidi-202609-import-09-system-design-search-suggestions
title: 设计一个搜索联想组件，你会怎么拆？
aliases: [搜索联想系统设计, autocomplete 设计]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [搜索联想, 防抖, 缓存, 竞态]
---

# 设计一个搜索联想组件，你会怎么拆？

## 核心回答

我会把它拆成输入状态、请求调度、缓存和结果展示四层。输入达到最小长度后防抖发请求，给每次请求绑定 AbortController 或序号，旧响应不能覆盖新关键词；最近结果做短时缓存，空结果和错误都要有明确状态。服务端还要做限流、参数校验和搜索词隐私处理，键盘上下选择、Escape 关闭和屏幕阅读器提示也属于设计的一部分。

