---
id: aaron-basic-ai-agent-agent-basics
title: Agent（智能体）是什么
aliases: [智能体怎样围绕目标行动？, Agent 与一次普通模型调用有什么差别？]
category: ai-agent
difficulty: 基础
priority: normal
projects: []
keywords: [Agent, 工具调用, 反馈循环]
---

# Agent（智能体）是什么

## 核心回答

Agent 是以模型为决策核心，能够围绕目标反复执行“观察 → 判断 → 调用工具 → 获取反馈 → 继续或停止”循环的系统。

```text
目标 + 指令 + 上下文/记忆 + 模型 + 工具 + 行动循环 + Guardrails/Evals
```

一次普通 LLM 调用是“输入一次，输出一次”；Agent 则可以根据中间结果改变下一步。但不是每个任务都需要 Agent：步骤固定、规则清楚的流程，用确定性工作流往往更容易测试、更便宜也更安全。
