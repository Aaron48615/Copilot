---
id: aaron-basic-ai-agent-llm-streaming
title: 前端如何实现 LLM 流式输出
aliases: [前端怎样逐步显示模型返回的文本？, LLM 的 SSE 文本流如何解析和渲染？]
category: ai-agent
difficulty: 进阶
priority: high
projects: []
keywords: [SSE, ReadableStream, TextDecoder, 半包, AbortController]
---

# 前端如何实现 LLM 流式输出

## 核心回答

#### 面试直接回答

前端通常通过 `fetch` 接收后端转发的 **SSE（`text/event-stream`）**，从 `response.body` 的 `ReadableStream` 持续读取字节，用 `TextDecoder` 解码，缓存被分割的半包，按 SSE 事件边界解析 `data:`，再逐步更新 UI。

LLM 文本生成主要是服务器到客户端的单向增量传输，SSE 就够用；只有语音对话、用户持续上行音频等双向实时场景才更适合 WebSocket/WebRTC。

#### 前端最小示例

假设自己的后端 `/api/chat` 返回 SSE，每个 `data:` 是 `{"delta":"..."}`：

```js
async function streamAnswer(prompt, onDelta, signal) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });

    // SSE 事件由空行分隔，一个 chunk 不等于一个完整事件
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";

    for (const event of events) {
      const data = event
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart())
        .join("\n");

      if (!data || data === "[DONE]") continue;
      onDelta(JSON.parse(data).delta ?? "");
    }

    if (done) break;
  }
}

const controller = new AbortController();
let answer = "";

streamAnswer(
  "解释事件循环",
  (delta) => {
    answer += delta;
    document.querySelector("#answer").textContent = answer;
  },
  controller.signal,
);

// 用户点击“停止生成”时：controller.abort()
```

#### 为什么不直接用 EventSource

`EventSource` 很适合标准 GET SSE，自带断线重连，但它不便发送 POST body 和自定义请求头。聊天请求通常需要 POST 较大的消息上下文，因此常用 `fetch + ReadableStream`。

#### 生产环境还要处理什么

- **API Key 放后端**：浏览器代码和 Network 请求对用户可见，不能内置模型服务密钥。
- **半包处理**：网络 chunk、UTF-8 字符边界和 SSE 事件边界不保证对齐。
- **取消和超时**：使用 `AbortController`，后端也应在客户断开后取消上游请求。
- **渲染性能**：不要每个 token 都触发整棵组件树更新，可按帧或 20–50ms 批量刷新。
- **Markdown 安全**：增量 Markdown 在代码块未闭合时可能抖动；允许 HTML 时必须防 XSS。
- **错误协议**：返回结构化的 `delta`、`error`、`done`、`usage` 事件，不要把错误文本当普通回答拼接。
- **重连与幂等**：中断后续传需要事件 ID 或响应 ID，避免重复拼接。
