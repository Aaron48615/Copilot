---
id: shiguang-followup-stream-framing
title: 追问：流式输出难在哪里？收到一块数据就直接解析 JSON 不行吗？
aliases: [能讲讲项目中的流式拆块、缓冲和完成状态吗？, 关于流式拆块、缓冲和完成状态，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: high
projects: [拾光集移动商城系统]
keywords: [追问, SSE, TextDecoder, done]
---

# 追问：流式输出难在哪里？收到一块数据就直接解析 JSON 不行吗？

## 核心回答

不一定行，因为网络每次给我的一块数据，不一定刚好是一条完整消息。有可能一条消息分了两次才到，也可能一次来了好几条，甚至中文的字节也会被拆开。如果每次读取后就直接转 JSON，就容易报错或者丢内容。

我这里先用 TextDecoder 的流式解码处理字节，再把文字放进缓冲区，按 SSE 的行和空行边界找完整事件。完整的一条才交给 JSON 解析，没收齐的留到下一次继续拼，同一块里有多条就逐条处理。

服务端统一发 `meta`、`delta`、`done`、`error` 这几类事件，前端收到 delta 追加文字，收到 done 才标记完成。如果连接提前结束，或者模型没有内容，都算分析失败，不能因为连接断了就当作正常结束。

【这些类型放在 SSE 的 data JSON 里。停止或失败时，已经收到的部分文字会保留，但标成未完成；商品表也还在，不会因为 AI 失败就把整个页面清掉。】

## 回答要点

- 不一定行，因为网络每次给我的一块数据，不一定刚好是一条完整消息。
- 我这里先用 TextDecoder 的流式解码处理字节，再把文字放进缓冲区，按 SSE 的行和空行边界找完整事件。
- 服务端统一发 `meta`、`delta`、`done`、`error` 这几类事件，前端收到 delta 追加文字，收到 done 才标记完成。

## 面试官可能追问

- 一块数据包含多条事件时应该如何处理？
- 连接提前关闭与收到 done 有什么区别？

## 代码证据

代码依据：[流式解码和事件缓冲](/Users/aaron/personal-hub/apps/project-2/src/compare/stream.ts:1)、[前端事件处理](/Users/aaron/personal-hub/apps/project-2/src/views/Compare.vue:381)、[服务端流式转换](/Users/aaron/personal-hub/apps/project-2/server/compare.ts:157)。
