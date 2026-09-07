---
id: lidi-202609-search-debounce-ai-q03
title: 如何解决旧请求覆盖新请求？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [防抖, AI, 搜索, 异常降级, 结果乱序, 输入联想]
---

# 如何解决旧请求覆盖新请求？

## 核心回答

1. 轻购搜索页在每次输入变化时调用 `stopSuggestionRequest`，先清除上一次 300 毫秒定时器，再调用旧 `AbortController.abort()`，并把 `suggestionRequestId` 加一。
2. 定时器真正执行后，会为这次请求创建新的 `AbortController`，并保存这次请求开始时的编号。返回以后，只有编号还等于当前编号，才会把建议写入 `aiSuggestions`。
3. 取消请求主要是减少无效网络和模型调用；请求编号是最后一道保险，因为请求可能已经发出，取消不一定能阻止服务端返回结果。
4. 页面卸载时也会调用同样的停止函数，避免组件已经销毁以后，旧请求还尝试修改页面状态。
