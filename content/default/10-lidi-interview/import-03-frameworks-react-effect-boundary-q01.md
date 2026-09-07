---
id: lidi-202609-import-03-frameworks-react-effect-boundary-q01
title: Effect 的清理什么时候执行？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [useEffect, Effect, 副作用, render, 事件]
---

# Effect 的清理什么时候执行？

## 核心回答

下一次依赖变化、组件卸载前，React 会先执行上一次的清理，再运行新的 Effect。开发环境 Strict Mode 还可能故意执行一次 setup-cleanup-setup 来帮助发现不完整的清理，不能把它当成生产重复请求的证据。

