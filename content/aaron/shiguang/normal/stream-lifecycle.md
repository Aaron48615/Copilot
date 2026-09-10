---
id: shiguang-normal-stream-lifecycle
title: 难点三：流式回答要正确拼接，也要能停止和重新生成
aliases: [能讲讲项目中的流式回答的拆包、停止和重新生成吗？, 关于流式回答的拆包、停止和重新生成，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 深入
priority: high
projects: [拾光集移动商城系统]
keywords: [难点, SSE, TextDecoder, AbortController]
---

# 难点三：流式回答要正确拼接，也要能停止和重新生成

## 核心回答

这个功能里我觉得比较需要注意的是，网络收到的一块数据不一定就是一条消息。有时候一条消息分两次到，有时候几条一起到，中文的字节也可能被拆开，所以不能每读一次就直接解析 JSON。

我先用 TextDecoder 做流式解码，再把文字留在缓冲区里，按 SSE 的行和空行边界取完整事件，没收齐的等下一块。前后端约定了 meta、delta、done、error 几种类型，收到增量就追加，明确收到完成事件才标记完成，连接提前断开就提示未完成。

另外用户可能生成到一半改预算或者换规格，这时候我会先更新请求版本，再用 AbortController 取消旧请求。后面收到文字、错误或完成消息，都要检查是不是当前这一轮，避免旧请求把新状态改掉。服务端也把取消信号传给上游，并加了超时限制。

【主动停止会保留已经生成的文字，标成未完成；修改条件会清掉旧建议，提示重新分析。取消是为了减少后续无用工作，版本检查是为了保证页面状态正确，不能只做其中一个。】

## 回答要点

- 这个功能里我觉得比较需要注意的是，网络收到的一块数据不一定就是一条消息。
- 我先用 TextDecoder 做流式解码，再把文字留在缓冲区里，按 SSE 的行和空行边界取完整事件，没收齐的等下一块。
- 另外用户可能生成到一半改预算或者换规格，这时候我会先更新请求版本，再用 AbortController 取消旧请求。

## 面试官可能追问

- 连接断开但没有 done 事件时应该显示什么状态？
- 主动停止和修改条件对已有文字的处理有什么不同？

## 代码证据

> **代码依据（不用于口述）**
> - [流式解码与事件缓冲](/Users/aaron/personal-hub/apps/project-2/src/compare/stream.ts:1)。
> - [条件变化使分析失效](/Users/aaron/personal-hub/apps/project-2/src/views/Compare.vue:230)。
> - [停止、流式接收和版本检查](/Users/aaron/personal-hub/apps/project-2/src/views/Compare.vue:337)。
> - [服务端取消与超时](/Users/aaron/personal-hub/apps/project-2/server/compare.ts:55)。
