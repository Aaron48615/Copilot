---
id: aaron-basic-ai-agent-harness-basics
title: Harness 是什么
aliases: [模型外层的运行框架负责什么？, AI Harness 包含哪些工程能力？]
category: ai-agent
difficulty: 进阶
priority: normal
projects: []
keywords: [Harness, 工具调用, 权限, 验证]
---

# Harness 是什么

## 核心回答

AI 工程中的 **Harness（运行框架/脚手架）**是包在模型外面的整套工程系统。模型只负责生成和决策，Harness 负责让它能在真实环境中可控地完成任务。

常见组成包括：

- 系统指令、上下文组装和记忆管理。
- 工具注册、调用循环、重试和超时。
- 沙箱、权限、审批和安全边界。
- 任务状态、持久化、中断与恢复。
- 日志、tracing、成本监控和 eval。
- 最终验证，例如运行测试、检查输出 schema。

同一个模型放在不同 Harness 中，任务成功率可能差很多。Agent 能不能稳定工作，不只看模型能力，也看外层工程是否给对了工具、反馈、边界和验证。
