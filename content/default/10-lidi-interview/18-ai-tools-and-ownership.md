---
id: lidi-202609-ai-tools-and-ownership
title: 你如何使用 Codex、Claude Code 和 Cursor？如何保证代码是自己理解的？
aliases: [AI 辅助开发, Codex, Claude Code, Cursor, AI 生成代码]
category: current-interview
difficulty: 简历追问
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [AI 工具, 代码理解, 验证, 测试, 安全]
---

# 你如何使用 Codex、Claude Code 和 Cursor？如何保证代码是自己理解的？

## 核心回答

1. 我会把 AI 当成辅助开发工具，先自己把需求、页面流程和数据结构想清楚，再让 AI 帮我拆任务、解释报错、补充边界或检查重复逻辑。轻购里我重点看过搜索联想、轻购AI、商品卖点、请求拦截器和购物车状态。
2. 轻购AI不是我让模型随便生成一段商品文案，而是前端调用 `/guide/recommend`，再按接口约定展示 `intent`、推荐商品、`matched`、`unmatched` 和 `relaxedConstraints`。我必须理解这些字段，才能判断页面是否展示正确。
3. 对搜索联想和商品卖点，我会阅读提示词、超时、取消请求、解析和 fallback 代码。比如搜索联想返回的内容不是五条时，代码不会直接展示，而是换成本地规则。
4. 对 Token、支付、用户输入和商品金额相关代码，我不会只看 AI 说“能跑”，还会检查权限、错误处理和服务端是否重新校验。
5. 最后我会自己运行、构建和手动验证。面试官如果问一段代码，我要能讲清楚输入、输出、状态变化和失败处理；讲不清楚就说明我还没有真正掌握。
