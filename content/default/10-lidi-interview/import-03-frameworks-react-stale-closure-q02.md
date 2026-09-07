---
id: lidi-202609-import-03-frameworks-react-stale-closure-q02
title: useCallback 能解决所有旧值吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [stale closure, 闭包, useRef, useEffect]
---

# useCallback 能解决所有旧值吗？

## 核心回答

不能。useCallback 只是缓存函数引用，依赖写错时仍然会缓存旧闭包。先明确函数需要读取哪些值，再决定依赖或改成函数式更新。

