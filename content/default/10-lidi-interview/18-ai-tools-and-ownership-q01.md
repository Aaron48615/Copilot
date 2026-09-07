---
id: lidi-202609-ai-tools-and-ownership-q01
title: AI 生成的代码出错了怎么办？
aliases: []
category: current-interview
difficulty: 简历追问
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [AI 工具, 代码理解, 验证, 测试, 安全]
---

# AI 生成的代码出错了怎么办？

## 核心回答

1. 我先自己做最小复现，确认是接口数据、状态更新、样式还是 AI 返回格式的问题，不会把整个项目丢给 AI 让它大改。
2. 比如轻购搜索联想出现旧结果覆盖新结果，我会把输入顺序、请求编号、AbortController 和实际返回顺序说明白，再让 AI 帮我检查；最后由我自己判断是否需要两层保护。
3. 如果轻购AI推荐不准确，我会先区分是意图解析错、商品数据不完整，还是前端把 `matched` / `unmatched` 展示错了。不同层的问题不能用同一个修复方案。
4. 修复以后我会看 diff，运行类型检查和构建，再手动测失败、空结果、重复输入和返回顺序等情况。AI 给出的代码能跑，不代表业务逻辑就正确。
