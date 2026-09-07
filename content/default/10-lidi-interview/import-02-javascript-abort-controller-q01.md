---
id: lidi-202609-import-02-javascript-abort-controller-q01
title: 取消能解决旧响应覆盖吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [AbortController, fetch, 取消, signal]
---

# 取消能解决旧响应覆盖吗？

## 核心回答

能减少旧请求继续消耗资源，但不能保证所有环境都立刻停止，也不能替代结果校验。搜索场景我会同时维护请求序号或当前关键词，只有最新一轮才能提交结果。这样即使旧请求晚到或后端已经处理完，也不会污染页面。
