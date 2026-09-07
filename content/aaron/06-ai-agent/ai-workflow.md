---
id: ai-agent-workflow
title: 你平时如何使用 AI 和 Agent 开发？
aliases: [ai开发流程, 如何使用agent, codex怎么用, ai工具帮你做什么]
category: ai-agent
difficulty: 高频
priority: high
projects: []
keywords: [Codex, Claude Code, 需求拆解, 代码审查, 测试]
---

# 你平时如何使用 AI 和 Agent 开发？

## 核心回答

我会先说明要解决的问题和相关代码，让 AI 给出修改思路，再检查方案是否符合项目现有结构。实现后看代码差异，并验证具体行为。

比如搜索请求，要检查正常返回、失败、连续输入和页面离开这些情况。构建通过能发现一部分问题，但不能代替实际操作。

## 追问：怎么避免一次改动范围太大？

先把需求拆成能够单独验证的小步，每一步确认结果后再继续。提示里说明相关文件和边界，评审时检查有没有混入无关改动。
