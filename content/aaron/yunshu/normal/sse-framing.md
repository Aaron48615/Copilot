---
id: yunshu-normal-sse-framing
title: 难点一：SSE 数据块不等于一条完整消息
aliases: [能讲讲项目中的SSE 数据块与完整消息的区别吗？, 关于SSE 数据块与完整消息的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [难点, TextDecoder, 缓冲区, SSE]
---

# 难点一：SSE 数据块不等于一条完整消息

## 核心回答

一次 reader.read 不一定是一条完整消息，可能只有半个 JSON，也可能一次有两条事件，直接 JSON.parse 就可能出错。

所以我用流式 TextDecoder 解码，文本先放缓冲区，只处理已经有换行的完整行，没读完的留到下一次，连接结束再处理尾部。

【比如 `data: {"type":"text","content":"北京"}\n` 可能从“北”和“京”之间拆开。当前只支持以 `data: ` 开头的单行 JSON，还没完整支持多行 data、event、id、注释和断线续传。可以用人工拆块、合块的流检查有没有重复或丢消息。】

## 回答要点

- 一次 reader.read 不一定是一条完整消息，可能只有半个 JSON，也可能一次有两条事件，直接 JSON.parse 就可能出错。
- 所以我用流式 TextDecoder 解码，文本先放缓冲区，只处理已经有换行的完整行，没读完的留到下一次，连接结束再处理尾部。
- 比如 `data: {"type":"text","content":"北京"}\n` 可能从“北”和“京”之间拆开。

## 面试官可能追问

- 多条消息合在一个块里时怎样逐条处理？
- 当前解析器与完整 SSE 协议还差哪些能力？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 145～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：流式请求和消息历史请求体。
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：流读取、跨块缓冲、逐行解析和尾部处理。
> - [AI.tsx，第 112～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:112)：不同事件到达后对同一个助手消息进行增量更新。
