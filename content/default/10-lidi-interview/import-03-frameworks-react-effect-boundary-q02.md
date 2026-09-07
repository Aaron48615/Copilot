---
id: lidi-202609-import-03-frameworks-react-effect-boundary-q02
title: 依赖数组能不能故意少写？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useEffect, Effect, 副作用, render, 事件]
---

# 依赖数组能不能故意少写？

## 核心回答

不应该。Effect 读取的响应式值都可能是依赖，少写会把旧值留在闭包里。若某个值本来不该触发 Effect，应该重构代码或把稳定的逻辑移出去，而不是靠 eslint-disable 压掉提醒。

