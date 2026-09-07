---
id: lidi-202609-import-07-testing-async-request-test-q01
title: 如何避免测试本身不稳定？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [竞态, 取消, mock, 请求测试]
---

# 如何避免测试本身不稳定？

## 核心回答

每个测试创建自己的请求 mock 和状态，结束后恢复计时器、网络拦截和全局对象。用明确的 promise resolver 或 fake timer 控制时序，避免真的等待几百毫秒。断言要等待用户可见状态出现，超时失败时保留请求日志，方便知道是实现问题还是测试环境问题。

