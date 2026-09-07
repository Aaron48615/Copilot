---
id: lidi-202609-import-03-frameworks-react-render-performance-q03
title: 状态放错位置会导致什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React 性能, rerender, memo, Profiler]
---

# 状态放错位置会导致什么？

## 核心回答

把高频变化放在过高的父组件，可能让整棵子树跟着更新。可以把状态下沉到真正需要它的区域，或者拆分订阅范围。状态位置比“用了哪个缓存 Hook”更影响更新范围。

