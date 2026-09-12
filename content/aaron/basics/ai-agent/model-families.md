---
id: aaron-basic-ai-agent-model-families
title: 常见的大模型
aliases: [常见语言模型有哪些系列？, 大模型选型主要比较哪些方面？]
category: ai-agent
difficulty: 基础
priority: normal
projects: []
keywords: [模型系列, 能力取舍, eval, 成本]
---

# 常见的大模型

## 核心回答

模型小版本变化很快，面试中更重要的是知道**模型系列、能力取舍和适用场景**，不是死背版本号。

| 系列 | 机构 | 常见特点 |
| --- | --- | --- |
| GPT | OpenAI | 通用推理、多模态、编程和工具调用 |
| Claude | Anthropic | 长文理解、编程、Agent 工作流 |
| Gemini | Google | 多模态、长上下文与 Google 生态 |
| Llama | Meta | 开放权重生态，适合私有化和二次开发 |
| Qwen（通义千问） | 阿里巴巴 | 中英文、编程、多模态和开放模型生态 |
| DeepSeek | DeepSeek | 推理、编程和性价比导向的 API/开放模型 |

真实选型要用自己的任务集做 eval，同时比较正确率、延迟、成本、上下文长度、数据合规和工具能力。
