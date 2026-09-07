---
id: lidi-202609-import-03-frameworks-react-stale-closure-q01
title: setInterval 怎么读取最新计数？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [stale closure, 闭包, useRef, useEffect]
---

# setInterval 怎么读取最新计数？

## 核心回答

可以让 interval 只负责触发一个函数，函数式更新计数；或者用 ref 同步最新值。更简单的场景是把 interval 放进依赖里，计数变化时重建并清理旧 interval，但要权衡重建成本。

