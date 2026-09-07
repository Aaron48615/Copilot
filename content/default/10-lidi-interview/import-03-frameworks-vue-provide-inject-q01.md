---
id: lidi-202609-import-03-frameworks-vue-provide-inject-q01
title: 注入值为什么有时不更新？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [provide, inject, Vue, 依赖注入, Pinia]
---

# 注入值为什么有时不更新？

## 核心回答

如果 provide 的是普通值，它本来就不是响应式；要传 ref、reactive 或计算值，后代才能跟着变化。解构 reactive 也可能丢掉响应式，需要 toRef 或保留对象引用。另一个常见问题是组件树中间换了 provider，实际注入来源已经变了，要通过 devtools 和最小复现确认。

