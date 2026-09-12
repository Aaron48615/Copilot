---
id: aaron-basic-ai-agent-coding-verification
title: 使用 AI Coding 时，怎样约束改动并验证结果？
aliases: [如何检查 AI 生成的代码？, AI 编码任务的范围和验收条件怎么定？]
category: ai-agent
difficulty: 基础
priority: normal
projects: []
keywords: [AI Coding, 修改范围, 测试, 代码审查]
---

# 使用 AI Coding 时，怎样约束改动并验证结果？

## 核心回答

### 一个可靠的 AI Coding 流程

1. 先给目标、上下文、约束和验收条件。
2. 让工具先读仓库规范、相关实现和测试。
3. 小步修改，避免无关重构扩大 diff。
4. 运行最贴近风险的 lint、类型检查、单测和集成测试。
5. 人工审查边界条件、安全、性能以及日志中是否包含敏感信息。
