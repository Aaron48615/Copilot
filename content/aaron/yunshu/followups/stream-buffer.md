---
id: yunshu-followup-stream-buffer
title: 追问：一次 read() 就是一条 SSE 消息吗？为什么要用 TextDecoder 和缓冲区？
aliases: [能讲讲项目中的read 数据块与 TextDecoder 缓冲处理吗？, 关于read 数据块与 TextDecoder 缓冲处理，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, TextDecoder, 缓冲区, data 事件]
---

# 追问：一次 read() 就是一条 SSE 消息吗？为什么要用 TextDecoder 和缓冲区？

## 核心回答

不是。一次 read 可能只有半条 JSON，也可能有几条事件，中文的多个字节也可能跨块。我用流式 TextDecoder 连续解码，再把文本放进缓冲区，有换行的完整行才处理，剩下的留到下一次。

【现在只支持一行 data 对应一个 JSON，没完整处理多行 data、event、id、注释和自动重连，解析失败的行也会跳过，所以还不是通用 SSE 解析器。】

## 回答要点

- 不是。一次 read 可能只有半条 JSON，也可能有几条事件，中文的多个字节也可能跨块。
- 现在只支持一行 data 对应一个 JSON，没完整处理多行 data、event、id、注释和自动重连，解析失败的行也会跳过，所以还不是通用 SSE 解析器。

## 面试官可能追问

- 中文字符的字节跨块时直接解码会有什么风险？
- 多行 data 与当前单行 JSON 约定有什么区别？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：流式解码、缓冲、换行拆分、JSON 解析和尾部处理。
> - [AI.tsx，第 112～126 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:112)：解析出的文本事件追加到指定助手消息。
