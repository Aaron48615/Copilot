---
id: yunshu-followup-sse-fetch-choice
title: 追问：AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource？
aliases: [能讲讲项目中的AI 使用 SSE 和 Fetch 的取舍吗？, 关于AI 使用 SSE 和 Fetch 的取舍，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [追问, SSE, Fetch, EventSource]
---

# 追问：AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource？

## 核心回答

这里主要是用户发一个问题，服务端持续返回回答，不需要长期双向通信，所以用了按 SSE 格式返回的 HTTP 流。接口要求 POST JSON、聊天历史、Authorization 和模型请求头，Fetch 能发送这些内容，也能读取 ReadableStream。

原生 EventSource 更适合 GET 订阅，不方便带当前请求体和自定义头；项目的 Axios 封装按完整响应处理，没有做逐块读取。

【这里按 data 事件解析回答。以后需要长期双向协作、多类主动推送或者连接复用，再考虑 WebSocket。】

## 回答要点

- 这里主要是用户发一个问题，服务端持续返回回答，不需要长期双向通信，所以用了按 SSE 格式返回的 HTTP 流。
- 原生 EventSource 更适合 GET 订阅，不方便带当前请求体和自定义头；项目的 Axios 封装按完整响应处理，没有做逐块读取。
- 这里按 data 事件解析回答。以后需要长期双向协作、多类主动推送或者连接复用，再考虑 WebSocket。

## 面试官可能追问

- 原生 EventSource 为什么不适合当前 POST 和自定义头？
- 什么需求变化才值得考虑长期 WebSocket 连接？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 145～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：POST、JSON 请求体、自定义请求头和 Fetch 调用。
> - [AI.tsx，第 186～205 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：读取响应流并解析 `data:` 事件。
> - [request.ts，第 11～33 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:11)：普通 Axios 实例按完整请求和响应处理。
