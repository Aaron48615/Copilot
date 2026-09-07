---
id: lidi-202609-import-03-frameworks-react-state-snapshot-q02
title: 怎么在更新后做事？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [state, snapshot, batching, setState, React]
---

# 怎么在更新后做事？

## 核心回答

如果是响应状态变化后同步外部系统，可以用 Effect；如果是按钮点击直接触发的提交，就放在事件处理里。不要为了“等 state 更新”随便套 setTimeout，时序会更不清楚。

