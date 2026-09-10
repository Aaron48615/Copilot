---
id: yunshu-followup-ai-backend-scope
title: 追问：你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染？
aliases: [能讲讲项目中的AI 查询、RAG 与输出渲染的实际范围吗？, 关于AI 查询、RAG 与输出渲染的实际范围，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, AI 后端, RAG, 文本渲染]
---

# 追问：你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染？

## 核心回答

我能讲清的是前端这部分：把聊天历史发给 /api/ai/chat，按用户配置带请求头，再读取 text 事件、更新消息。当前目录没有 AI 后端、数据库查询、向量检索或训练代码，所以不能说已经做了 RAG、向量库或模型训练。

输出也没用完整 Markdown 解析，只把双星号里的文字转成 React 加粗节点，其他按文本显示。

【欢迎文案提到了城市查询和内置规则，但具体服务端能力还要核实。没有直接插入原始 HTML，也不代表整个应用一定没有 XSS 风险。】

## 回答要点

- 我能讲清的是前端这部分：把聊天历史发给 /api/ai/chat，按用户配置带请求头，再读取 text 事件、更新消息。
- 输出也没用完整 Markdown 解析，只把双星号里的文字转成 React 加粗节点，其他按文本显示。
- 欢迎文案提到了城市查询和内置规则，但具体服务端能力还要核实。

## 面试官可能追问

- 欢迎文案宣称城市查询能否证明后端有数据库实现？
- 仅渲染加粗文本与完整 Markdown 渲染有什么区别？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 48～51 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:48)：城市查询和规则模式属于界面欢迎文案。
> - [AI.tsx，第 79～100 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:79)：只处理双星号加粗的文本渲染。
> - [AI.tsx，第 145～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：前端能够确认的 AI 请求链路。
> - [AI.tsx，第 279～281 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:279)：助手消息的实际渲染入口。
