---
id: lidi-202609-import-03-frameworks-react-render-performance-q01
title: 列表为什么要用稳定 key？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React 性能, rerender, memo, Profiler]
---

# 列表为什么要用稳定 key？

## 核心回答

key 让 React 知道一行数据是不是原来那一行。插入、删除和排序时如果用 index，带本地状态的行可能被错误复用，输入内容就会跑到别的行。稳定 key 应来自业务实体 ID。

