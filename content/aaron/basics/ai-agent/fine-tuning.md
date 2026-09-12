---
id: aaron-basic-ai-agent-fine-tuning
title: Fine-tuning（微调）是什么
aliases: [模型微调解决什么问题？, 微调与检索增强生成的用途有何差别？]
category: ai-agent
difficulty: 进阶
priority: normal
projects: []
keywords: [微调, RAG, 训练数据, eval]
---

# Fine-tuning（微调）是什么

## 核心回答

微调是在基础模型上使用高质量任务数据继续训练，让模型更稳定地学会特定行为、风格、分类边界或输出格式。

| 对比 | RAG | Fine-tuning |
| --- | --- | --- |
| 主要解决 | 模型缺少外部/私有/最新知识 | 模型行为或输出不稳定 |
| 知识更新 | 换文档或索引即可 | 通常需要新数据和新训练 |
| 可追溯性 | 可引用检索到的资料 | 参数中的学习结果难以指向原文 |
| 典型场景 | 知识库问答、内部文档 | 稳定格式、专用分类、固定风格 |

> [!important]
> “把公司文档微调进模型”通常不是第一选择。如果问题是需要最新或可引用的知识，优先考虑 RAG；如果是行为不稳定，先优化 Prompt 和工作流，再用 eval 判断是否需要微调。
