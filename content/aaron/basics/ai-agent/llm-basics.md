---
id: aaron-basic-ai-agent-llm-basics
title: LLM 是什么
aliases: [大语言模型怎样生成回答？, LLM 的训练和推理是什么？]
category: ai-agent
difficulty: 基础
priority: normal
projects: []
keywords: [LLM, Token, 预训练, 上下文]
---

# LLM 是什么

## 核心回答

**LLM（Large Language Model，大语言模型）**是在大规模数据上训练的神经网络模型。它先将输入拆成 token，再根据上下文预测后续 token 的概率，通过逐步生成完成问答、摘要、翻译和编程等任务。

现代 LLM 大多以 Transformer 为基础，但面试时不要只回答“它是 Transformer”，还应说出：

- **预训练**：从大量数据中学习语言、代码和世界模式。
- **后训练/对齐**：让模型更好地遵循指令、使用工具和满足安全要求。
- **推理**：用已训练的参数对当前输入生成结果。
- **上下文窗口**：单次请求能处理的 token 范围，不等于永久记忆。
- **局限**：结果具有概率性，可能幻觉、过时或输出不稳定，关键结论需要外部证据和验证。

#### 一句话回答

> LLM 本质上是根据上下文对后续 token 建模的大规模神经网络，它通过预训练学习通用模式，再经过后训练获得指令遵循和工具使用能力。
