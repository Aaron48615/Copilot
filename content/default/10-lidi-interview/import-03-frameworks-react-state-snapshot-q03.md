---
id: lidi-202609-import-03-frameworks-react-state-snapshot-q03
title: 为什么直接改对象 state 不行？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [state, snapshot, batching, setState, React]
---

# 为什么直接改对象 state 不行？

## 核心回答

React 主要通过引用变化判断是否需要更新。直接改原对象再传回同一个引用，可能让 React 认为没有变化，也破坏了上一轮快照的可预测性。应该复制实际修改的那一层，再设置新对象。

