---
id: lidi-202609-city-ai-assistant
title: 城市视图的 AI 助手是怎么做的？
aliases: [AI助手, 流式回复, SSE 聊天, AIChat]
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [AI助手, fetch, ReadableStream, SSE, TextDecoder, 会话, Redux, Token]
---

# 城市视图的 AI 助手是怎么做的？

城市视图这个 AI 助手，就是个聊天页。用户发一句，助手的字是一点点出来的。

我分三块说。

第一，发消息。用户一点发送，我先把这句话放到列表里，再补一条空的助手消息，后面读到的字都往这条上加。还没有对话 ID 的话，先调接口建会话，把用户消息存进去。生成回复是 `fetch` 打自己后端的 `/api/ai/chat`，请求头带 Redux 里的 Token。模型 Key 不在前端。

第二，读流。后端不是一次返回整段文字，而是一块一块推过来。我用 `response.body.getReader()` 读，`TextDecoder` 把字节转成文本。网络给的不一定刚好是一条完整数据，可能半截，也可能一次好几条，所以我留了一个 buffer：完整的按空行切开，不完整的先留着，等下一块拼上再解析。解析到内容，就用函数式 `setState` 更新最后那条助手消息，避免拿到旧的列表。

第三，收尾。流读完，把拼好的整段回复存进这个会话，刷新历史列表。失败就在气泡里写请求失败。发送中会锁住，避免连点。

前端就是这三件事：把请求发出去、把流式内容显示出来、把对话存住。模型怎么生成是后端做的。
