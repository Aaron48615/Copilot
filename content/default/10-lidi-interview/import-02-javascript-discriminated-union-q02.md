---
id: lidi-202609-import-02-javascript-discriminated-union-q02
title: 状态转换应该放在哪？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [联合类型, 状态机, loading, error, TypeScript]
---

# 状态转换应该放在哪？

## 核心回答

简单请求可以在 hook 或组件里处理；状态多、转移有规则时，我会用 reducer 或单独的 transition 函数。每次只接收当前状态和事件，返回下一个合法状态，测试也会更容易写。
