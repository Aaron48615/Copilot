---
id: lidi-202609-import-07-testing-async-request-test-q02
title: 重试要测几次？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [竞态, 取消, mock, 请求测试]
---

# 重试要测几次？

## 核心回答

至少测一次临时错误后成功、达到上限仍失败、用户主动取消和非重试错误立即失败。还要断言退避时间或下一次请求的间隔，确保重试不会在网络故障时打爆服务。若有请求去重，则再测同一资源并发只发一次。

