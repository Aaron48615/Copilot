---
id: yunshu-normal-ai-stream
title: AI 助手的流式回答
aliases: [能讲讲项目中的AI 助手的流式回答流程吗？, 关于AI 助手的流式回答流程，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Fetch, ReadableStream, TextDecoder]
---

# AI 助手的流式回答

## 核心回答

用户发问题后，前端把聊天历史和这次问题一起发给 `/api/ai/chat`，先插入一条空的助手消息，后面收到内容就往这条消息里追加。

这里用 Fetch 读取 ReadableStream，再用 TextDecoder 解码，把上次没读完的内容和新内容拼起来，按换行取完整的 data 事件。文本事件追加回答，完成事件结束加载；请求如果返回 401，也会复用 Token 刷新，最多重试一次。

【用户可以配置 Key、Base URL 和模型名。没填 Key 时前端不发 Key 头，页面说明由后端使用内置规则，但这个目录没有 AI 后端代码，具体降级和模型调用还无法核实。现在也没有取消请求，只解析一行一个 data JSON 的格式。】

## 回答要点

- 用户发问题后，前端把聊天历史和这次问题一起发给 `/api/ai/chat`，先插入一条空的助手消息，后面收到内容就往这条消息里追加。
- 这里用 Fetch 读取 ReadableStream，再用 TextDecoder 解码，把上次没读完的内容和新内容拼起来，按换行取完整的 data 事件。
- 用户可以配置 Key、Base URL 和模型名。

## 面试官可能追问

- 一次 read 只有半条 JSON 时怎么处理？
- 没有 AI 后端代码时哪些降级结论不能确认？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 36～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：读取和保存 AI Key、Base URL、模型名的浏览器配置。
> - [AI.tsx，第 101～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:101)：插入用户消息和助手占位消息，并逐事件更新同一条回复。
> - [AI.tsx，第 145～184 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：构造流式请求头、发送历史消息并处理一次 401 刷新重试。
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：ReadableStream、TextDecoder、跨数据块缓冲和 `data:` JSON 解析。
> - [AI.tsx，第 329～382 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:329)：AI 配置表单以及“保存在当前浏览器、无 Key 使用内置规则”的界面说明。
