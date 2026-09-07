---
id: lidi-202609-import-07-testing-test-strategy-q02
title: 测试应该断言什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [单元测试, 组件测试, 集成测试, E2E]
---

# 测试应该断言什么？

## 核心回答

优先断言用户能观察到的结果，例如错误提示、按钮状态、列表内容和跳转；实现细节只在确实是公共契约时断言。异步测试要等待可见结果，而不是固定 sleep。这样组件内部换实现时，测试仍然能保护真正的行为。

