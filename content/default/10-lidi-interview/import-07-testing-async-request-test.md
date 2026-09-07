---
id: lidi-202609-import-07-testing-async-request-test
title: 异步请求的竞态和取消怎么测试？
aliases: [请求竞态测试, AbortController 测试]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [竞态, 取消, mock, 请求测试]
---

# 异步请求的竞态和取消怎么测试？

## 核心回答

我会让测试控制请求何时完成，而不是让它们按发起顺序自动返回。先发请求 A，再发请求 B，故意让 A 最后完成，断言页面仍显示 B 的结果；取消场景则让 mock 检查 AbortSignal，并断言取消后不会出现错误 toast 或错误数据。还要覆盖超时、服务端错误、空结果和组件销毁这几条路径。

