---
id: lidi-202609-import-02-javascript-function-overload-q02
title: 重载怎么避免实现和声明不一致？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, overload, union, tuple]
---

# 重载怎么避免实现和声明不一致？

## 核心回答

实现体里的参数通常用联合或 unknown，先做运行时分支和收窄，再返回对应结果；测试同时覆盖每个公开签名。不要在实现里直接用 any 逃掉检查，否则重载只是编辑器提示，实际代码仍可能处理错误输入。
