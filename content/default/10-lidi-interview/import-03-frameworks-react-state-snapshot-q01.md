---
id: lidi-202609-import-03-frameworks-react-state-snapshot-q01
title: React 为什么要批处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [state, snapshot, batching, setState, React]
---

# React 为什么要批处理？

## 核心回答

批处理能把一次事件里的多次更新合并，减少重复 render。React 18 以后，很多异步回调里的更新也会批处理。写代码时不要依赖“调用 setter 后立刻读到新值”，需要新值就从下一次 render 或函数式更新里拿。

