---
id: aaron-basic-ai-agent-rag-basics
title: RAG 是什么
aliases: [检索增强生成如何工作？, RAG 怎样利用外部知识库回答问题？]
category: ai-agent
difficulty: 进阶
priority: high
projects: []
keywords: [RAG, 检索, Embedding, 知识库]
---

# RAG 是什么

## 核心回答

**RAG（Retrieval-Augmented Generation，检索增强生成）**是在生成答案前，先从外部知识库找到与问题最相关的资料，再把问题和资料一起交给模型。

#### 典型流程

```text
文档采集 → 清洗/切块 → Embedding → 写入向量库
                                             ↓
用户问题 → 检索 → 重排/权限过滤 → 组装上下文 → LLM 生成并引用来源
```

RAG 适合企业内部知识、产品文档、规章制度、实时更新资料。它的好处是知识可更新、来源可追溯，不需要每次重新训练模型。

常见失败点不只在生成阶段，还包括切块不合理、检索漏召回、过时文档、未做用户权限过滤，以及模型没有忠实使用证据。
