---
id: lidi-202609-import-08-coding-throttle-q02
title: 怎么测时间边界？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [throttle, 节流, leading, trailing]
---

# 怎么测时间边界？

## 核心回答

用 fake timer 控制时间，覆盖窗口内多次调用、恰好到边界、cancel、flush、leading=false 和 trailing=false。断言调用次数与最后一次参数，不能只等真实时间后看结果，否则 CI 负载变化会让测试抖动。

